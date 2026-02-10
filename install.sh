#!/usr/bin/env bash
#
# install.sh - Install agent skills to current project
# Usage: curl -fsSL https://raw.githubusercontent.com/buiducnhat/agent-skills/main/install.sh | bash
#

set -euo pipefail

REPO_URL="https://github.com/buiducnhat/agent-skills.git"
BRANCH="main"

# Colors & Styles
BOLD='\033[1m'
DIM='\033[2m'
ITALIC='\033[3m'
UNDERLINE='\033[4m'
RESET='\033[0m'

# Foreground colors
BLACK='\033[0;30m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[0;37m'

# Bright colors
BRIGHT_GREEN='\033[1;32m'
BRIGHT_BLUE='\033[1;34m'
BRIGHT_CYAN='\033[1;36m'
BRIGHT_WHITE='\033[1;37m'

# Theme colors (semantic)
PRIMARY="${BRIGHT_CYAN}"
SUCCESS="${BRIGHT_GREEN}"
WARNING="${YELLOW}"
ERROR="${RED}"
INFO="${BLUE}"
MUTED="${DIM}"

# Detect if running in interactive terminal
if [[ ! -t 1 ]]; then
    # Disable colors for non-TTY
    BOLD='' DIM='' ITALIC='' UNDERLINE='' RESET=''
    BLACK='' RED='' GREEN='' YELLOW='' BLUE='' MAGENTA='' CYAN='' WHITE=''
    BRIGHT_GREEN='' BRIGHT_BLUE='' BRIGHT_CYAN='' BRIGHT_WHITE=''
    PRIMARY='' SUCCESS='' WARNING='' ERROR='' INFO='' MUTED=''
fi

# Utility functions
print_step() {
    local step_num="$1"
    local message="$2"
    echo -e "${PRIMARY}[${step_num}]${RESET} ${message}"
}

print_success() {
    echo -e "${SUCCESS}✓${RESET} $1"
}

print_warning() {
    echo -e "${WARNING}!${RESET} $1"
}

print_error() {
    echo -e "${ERROR}✗${RESET} $1"
}

print_info() {
    echo -e "${INFO}→${RESET} $1"
}

# Banner
print_banner() {
    echo ""
    echo -e "${PRIMARY}"
    cat << 'EOF'
   ░███                                        ░██         ░██████   ░██       ░██░██ ░██
  ░██░██                                       ░██        ░██   ░██  ░██          ░██ ░██
 ░██  ░██   ░████████  ░███████  ░████████  ░████████    ░██         ░██    ░██░██░██ ░██  ░███████
░█████████ ░██    ░██ ░██    ░██ ░██    ░██    ░██        ░████████  ░██   ░██ ░██░██ ░██ ░██
░██    ░██ ░██    ░██ ░█████████ ░██    ░██    ░██               ░██ ░███████  ░██░██ ░██  ░███████
░██    ░██ ░██   ░███ ░██        ░██    ░██    ░██        ░██   ░██  ░██   ░██ ░██░██ ░██        ░██
░██    ░██  ░█████░██  ░███████  ░██    ░██     ░████      ░██████   ░██    ░██░██░██ ░██  ░███████
                  ░██
            ░███████

EOF
    echo -e "${RESET}"
    echo -e "  ${MUTED}Claude Code Skills Installer ${DIM}v1.0${RESET}"
    echo -e "  ${MUTED}─────────────────────────────────────${RESET}"
    echo ""
}

# Spinner for long-running operations
spinner() {
    local pid=$1
    local message="${2:-Processing...}"
    local spin_chars='⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'
    local i=0

    # Hide cursor
    tput civis 2>/dev/null || true

    while kill -0 "$pid" 2>/dev/null; do
        local char="${spin_chars:$i:1}"
        printf "\r${PRIMARY}%s${RESET} %s" "$char" "$message"
        i=$(( (i + 1) % ${#spin_chars} ))
        sleep 0.1
    done

    # Show cursor
    tput cnorm 2>/dev/null || true

    # Clear the spinner line
    printf "\r\033[K"
}

# Run command with spinner
run_with_spinner() {
    local message="$1"
    shift

    # Run command in background
    "$@" &
    local pid=$!

    spinner "$pid" "$message"

    # Wait and get exit status
    wait "$pid"
    return $?
}

# Step tracking
CURRENT_STEP=0
TOTAL_STEPS=4

next_step() {
    CURRENT_STEP=$((CURRENT_STEP + 1))
    echo -e "${MUTED}[${CURRENT_STEP}/${TOTAL_STEPS}]${RESET} $1"
}

complete_step() {
    echo -e "${SUCCESS}  ✓${RESET} ${MUTED}$1${RESET}"
}

# Box drawing
print_box() {
    local title="$1"
    local width=50
    local border_color="${PRIMARY}"

    echo -e "${border_color}╭$( printf '─%.0s' $(seq 1 $width) )╮${RESET}"
    echo -e "${border_color}│${RESET} ${BOLD}${title}$(printf '%*s' $((width - ${#title} - 1)) '')${border_color}│${RESET}"
    echo -e "${border_color}├$( printf '─%.0s' $(seq 1 $width) )┤${RESET}"
}

print_box_line() {
    local content="$1"
    local width=50
    local border_color="${PRIMARY}"
    # Strip ANSI escape codes and measure visible character length
    local visible_len
    visible_len=$(printf '%b' "$content" | sed $'s/\033\[[0-9;]*m//g' | wc -m)
    visible_len=$((visible_len))
    # padding: total width minus left border space (1) minus visible content
    local padding=$((width - 1 - visible_len))
    if [[ $padding -lt 0 ]]; then
        padding=0
    fi

    echo -e "${border_color}│${RESET} ${content}$(printf '%*s' $padding '')${border_color}│${RESET}"
}

print_box_end() {
    local width=50
    local border_color="${PRIMARY}"
    echo -e "${border_color}╰$( printf '─%.0s' $(seq 1 $width) )╯${RESET}"
}

print_success_banner() {
    echo ""
    echo -e "  ${SUCCESS}╭─────────────────────────────────────────╮${RESET}"
    echo -e "  ${SUCCESS}│${RESET}  ${BOLD}${SUCCESS}✓ Installation Complete!${RESET}               ${SUCCESS}│${RESET}"
    echo -e "  ${SUCCESS}╰─────────────────────────────────────────╯${RESET}"
    echo ""
}

# Show banner
print_banner

# Create temp directory
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

# Clone repository
next_step "Downloading skills repository..."
run_with_spinner "Cloning from GitHub..." git clone --depth 1 --branch "$BRANCH" "$REPO_URL" "$TEMP_DIR" 2>/dev/null
complete_step "Repository downloaded"
echo ""

# Check if .claude already exists
if [[ -d ".claude" ]]; then
    echo -e "${WARNING}!${RESET} ${BOLD}Existing installation detected${RESET}"
    echo -e "  ${MUTED}Switching to update mode...${RESET}"
    echo ""

    next_step "Preparing update script..."
    mkdir -p .claude/scripts
    cp "$TEMP_DIR/.claude/scripts/update-skills.sh" ./.claude/scripts/update-skills.sh
    chmod +x ./.claude/scripts/update-skills.sh
    complete_step "Update script ready"
    echo ""

    next_step "Updating skills..."
    ./.claude/scripts/update-skills.sh --init-manifest >/dev/null 2>&1
    ./.claude/scripts/update-skills.sh
    complete_step "Skills updated"
    echo ""
else
    # Fresh install
    next_step "Installing .claude directory..."
    cp -R "$TEMP_DIR/.claude" .
    complete_step "Directory created"
    echo ""

    next_step "Installing CLAUDE.md..."
    cp "$TEMP_DIR/CLAUDE.md" .
    complete_step "Configuration installed"
    echo ""

    # Make scripts executable
    next_step "Setting up scripts..."
    chmod +x .claude/scripts/*.sh 2>/dev/null || true
    ./.claude/scripts/update-skills.sh --init-manifest >/dev/null 2>&1
    complete_step "Scripts configured"
    echo ""
fi

print_success_banner

print_box "Quick Start"
print_box_line "${INFO}→${RESET} ${BOLD}/docs --init${RESET}          Initialize docs"
print_box_line "${INFO}→${RESET} ${BOLD}/brainstorm${RESET} <topic>   Explore ideas"
print_box_line "${INFO}→${RESET} ${BOLD}/write-plan${RESET} <feature> Create plans"
print_box_line "${INFO}→${RESET} ${BOLD}/execute-plan${RESET} <path>  Run plans"
print_box_end

echo ""
print_box "Maintenance"
print_box_line "${MUTED}.claude/scripts/update-skills.sh${RESET}"
print_box_line "${MUTED}  --status${RESET}  Check skill versions"
print_box_line "${MUTED}  --help${RESET}    Show all options"
print_box_end

echo ""
echo -e "  ${MUTED}Documentation: ${UNDERLINE}https://github.com/buiducnhat/agent-skills${RESET}"
echo ""

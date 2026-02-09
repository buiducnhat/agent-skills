#!/usr/bin/env bash
#
# install.sh - Install agent skills to current project
# Usage: curl -fsSL https://raw.githubusercontent.com/buiducnhat/agent-skills/main/install.sh | bash
#

set -euo pipefail

REPO_URL="https://github.com/buiducnhat/agent-skills.git"
BRANCH="main"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}Installing Agent Skills...${NC}"

# Create temp directory
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

# Clone repository
echo -e "${BLUE}Downloading from $REPO_URL...${NC}"
git clone --depth 1 --branch "$BRANCH" "$REPO_URL" "$TEMP_DIR" 2>/dev/null

# Check if .claude already exists
if [[ -d ".claude" ]]; then
    echo -e "${YELLOW}Existing .claude directory found.${NC}"
    echo -e "${YELLOW}Running update instead of fresh install...${NC}"

    # Copy update script and run it
    mkdir -p .claude/scripts
    cp "$TEMP_DIR/.claude/scripts/update-skills.sh" ./.claude/scripts/update-skills.sh
    chmod +x ./.claude/scripts/update-skills.sh
    ./.claude/scripts/update-skills.sh --init-manifest
    ./.claude/scripts/update-skills.sh
else
    # Fresh install
    echo -e "${BLUE}Installing .claude/ directory...${NC}"
    cp -R "$TEMP_DIR/.claude" .

    echo -e "${BLUE}Installing CLAUDE.md...${NC}"
    cp "$TEMP_DIR/CLAUDE.md" .

    # Make scripts executable
    chmod +x .claude/scripts/*.sh 2>/dev/null || true

    # Initialize manifest
    ./.claude/scripts/update-skills.sh --init-manifest
fi

echo ""
echo -e "${GREEN}✓ Agent Skills installed successfully!${NC}"
echo ""
echo "Available commands:"
echo "  ./.claude/scripts/update-skills.sh          # Update skills from remote"
echo "  ./.claude/scripts/update-skills.sh --status # Check skill status"
echo "  ./.claude/scripts/update-skills.sh --help   # Show all options"
echo ""
echo "Start using skills in Claude Code:"
echo "  /brainstorm <topic>"
echo "  /write-plan <feature>"
echo "  /docs --init"

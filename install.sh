#!/usr/bin/env bash
#
# Quick installer for @buiducnhat/agent-skills
#
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/buiducnhat/agent-skills/main/install.sh | bash
#   curl -fsSL https://raw.githubusercontent.com/buiducnhat/agent-skills/main/install.sh | bash -s -- --agents claude,cursor
#
set -euo pipefail

RED='\033[0;31m'
NC='\033[0m'

if ! command -v node &>/dev/null; then
  echo -e "${RED}Error:${NC} Node.js is required but not found."
  echo "Install it from https://nodejs.org or via your package manager."
  exit 1
fi

NODE_MAJOR=$(node -e "console.log(process.versions.node.split('.')[0])")
if [ "$NODE_MAJOR" -lt 18 ]; then
  echo -e "${RED}Error:${NC} Node.js 18+ is required (found v$(node -v))."
  exit 1
fi

exec npx --yes @buiducnhat/agent-skills "$@"

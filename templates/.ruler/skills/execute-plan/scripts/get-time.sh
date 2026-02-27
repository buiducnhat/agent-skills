#!/usr/bin/env bash
#
# get-time.sh - Get current time in YYMMDD-HHmm and YYYY-MM-DD HH:mm:ss format
# Repository: https://github.com/buiducnhat/agent-skills.git

echo "$(date +%y%m%d-%H%M)"
echo "$(date +%Y-%m-%d\ %H:%M:%S)"

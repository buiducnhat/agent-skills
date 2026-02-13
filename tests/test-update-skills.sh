#!/usr/bin/env bash
#
# Unit tests for update-skills.sh
# Run: bash tests/test-update-skills.sh
#

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

TESTS_PASSED=0
TESTS_FAILED=0
TESTS_TOTAL=0

# Test helpers
assert_eq() {
    local expected="$1"
    local actual="$2"
    local msg="${3:-}"
    TESTS_TOTAL=$((TESTS_TOTAL + 1))
    if [[ "$expected" == "$actual" ]]; then
        TESTS_PASSED=$((TESTS_PASSED + 1))
        echo -e "  ${GREEN}✓${NC} $msg"
    else
        TESTS_FAILED=$((TESTS_FAILED + 1))
        echo -e "  ${RED}✗${NC} $msg"
        echo -e "    expected: '$expected'"
        echo -e "    actual:   '$actual'"
    fi
}

assert_true() {
    local cmd="$1"
    local msg="${2:-}"
    TESTS_TOTAL=$((TESTS_TOTAL + 1))
    if eval "$cmd"; then
        TESTS_PASSED=$((TESTS_PASSED + 1))
        echo -e "  ${GREEN}✓${NC} $msg"
    else
        TESTS_FAILED=$((TESTS_FAILED + 1))
        echo -e "  ${RED}✗${NC} $msg"
    fi
}

assert_false() {
    local cmd="$1"
    local msg="${2:-}"
    TESTS_TOTAL=$((TESTS_TOTAL + 1))
    if ! eval "$cmd"; then
        TESTS_PASSED=$((TESTS_PASSED + 1))
        echo -e "  ${GREEN}✓${NC} $msg"
    else
        TESTS_FAILED=$((TESTS_FAILED + 1))
        echo -e "  ${RED}✗${NC} $msg"
    fi
}

assert_file_exists() {
    local file="$1"
    local msg="${2:-File $file exists}"
    TESTS_TOTAL=$((TESTS_TOTAL + 1))
    if [[ -f "$file" ]]; then
        TESTS_PASSED=$((TESTS_PASSED + 1))
        echo -e "  ${GREEN}✓${NC} $msg"
    else
        TESTS_FAILED=$((TESTS_FAILED + 1))
        echo -e "  ${RED}✗${NC} $msg (file not found)"
    fi
}

assert_file_content() {
    local file="$1"
    local expected="$2"
    local msg="${3:-}"
    TESTS_TOTAL=$((TESTS_TOTAL + 1))
    if [[ -f "$file" ]]; then
        local actual
        actual=$(cat "$file")
        if [[ "$actual" == "$expected" ]]; then
            TESTS_PASSED=$((TESTS_PASSED + 1))
            echo -e "  ${GREEN}✓${NC} $msg"
        else
            TESTS_FAILED=$((TESTS_FAILED + 1))
            echo -e "  ${RED}✗${NC} $msg"
            echo -e "    expected content: '$expected'"
            echo -e "    actual content:   '$actual'"
        fi
    else
        TESTS_FAILED=$((TESTS_FAILED + 1))
        echo -e "  ${RED}✗${NC} $msg (file not found)"
    fi
}

# Setup/teardown
TEST_TMPDIR=""

setup() {
    TEST_TMPDIR=$(mktemp -d)
    # Create a fake project structure
    mkdir -p "$TEST_TMPDIR/project/.claude/skills"
    mkdir -p "$TEST_TMPDIR/project/.claude/lib"
    mkdir -p "$TEST_TMPDIR/project/.claude/scripts"

    # Create a fake upstream (simulating cloned repo)
    mkdir -p "$TEST_TMPDIR/upstream/.claude/skills/skill-a"
    mkdir -p "$TEST_TMPDIR/upstream/.claude/skills/skill-b"
    mkdir -p "$TEST_TMPDIR/upstream/.claude/lib"
    mkdir -p "$TEST_TMPDIR/upstream/.claude/scripts"

    echo "# Skill A v1" > "$TEST_TMPDIR/upstream/.claude/skills/skill-a/SKILL.md"
    mkdir -p "$TEST_TMPDIR/upstream/.claude/skills/skill-a/references"
    echo "ref-a" > "$TEST_TMPDIR/upstream/.claude/skills/skill-a/references/ref.md"
    echo "# Skill B v1" > "$TEST_TMPDIR/upstream/.claude/skills/skill-b/SKILL.md"
    echo "// lib code" > "$TEST_TMPDIR/upstream/.claude/lib/core.js"
    echo "#!/bin/bash" > "$TEST_TMPDIR/upstream/.claude/scripts/helper.sh"
    echo "# Project CLAUDE" > "$TEST_TMPDIR/upstream/CLAUDE.md"

    # Source the script functions
    # We need to override globals to point to our test dirs
    export PROJECT_ROOT="$TEST_TMPDIR/project"
    export MANIFEST_FILE="$TEST_TMPDIR/project/.claude/.upstream-manifest"
    export BACKUP_DIR="$TEST_TMPDIR/project/.claude-backup"
    export TEMP_DIR="$TEST_TMPDIR/upstream"
    export DRY_RUN=false
    export FORCE=false
    export VERBOSE=false
    export NO_BACKUP=false
    export CUSTOM_BACKUP_DIR=""
    export MAX_BACKUPS=3
    export MANIFEST_TEMP=""
    export REPO_URL="https://github.com/test/test.git"

    # Reset counters
    export FILES_CREATED=0
    export FILES_UPDATED=0
    export FILES_UNCHANGED=0
    export FILES_SKIPPED=0

    cd "$PROJECT_ROOT"
}

teardown() {
    if [[ -n "$TEST_TMPDIR" && -d "$TEST_TMPDIR" ]]; then
        rm -rf "$TEST_TMPDIR"
    fi
}

# Resolve path to the actual script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCRIPT_PATH="$SCRIPT_DIR/.claude/scripts/update-skills.sh"

# Source only the functions (not main)
source_functions() {
    # Extract functions from the script without running main
    # We'll source a modified version
    local tmp_source
    tmp_source=$(mktemp)
    # Remove the 'main "$@"' call and 'set -euo pipefail' and 'cd' and 'trap'
    sed \
        -e 's/^main "\$@"//' \
        -e 's/^set -euo pipefail//' \
        -e '/^cd "\$PROJECT_ROOT"/d' \
        -e '/^trap cleanup EXIT/d' \
        -e '/^SCRIPT_DIR=/d' \
        -e '/^PROJECT_ROOT=/d' \
        "$SCRIPT_PATH" > "$tmp_source"
    source "$tmp_source"
    rm -f "$tmp_source"
}

test_get_file_hash() {
    echo "=== test_get_file_hash ==="
    setup
    source_functions

    local file="$TEST_TMPDIR/hashtest.txt"
    echo "hello world" > "$file"
    local hash1
    hash1=$(get_file_hash "$file")

    assert_true '[[ -n "$hash1" ]]' "hash is non-empty"
    assert_true '[[ ${#hash1} -ge 32 ]]' "hash has reasonable length"

    # Same content = same hash
    echo "hello world" > "$TEST_TMPDIR/hashtest2.txt"
    local hash2
    hash2=$(get_file_hash "$TEST_TMPDIR/hashtest2.txt")
    assert_eq "$hash1" "$hash2" "identical files produce same hash"

    # Different content = different hash
    echo "different" > "$TEST_TMPDIR/hashtest3.txt"
    local hash3
    hash3=$(get_file_hash "$TEST_TMPDIR/hashtest3.txt")
    assert_true '[[ "$hash1" != "$hash3" ]]' "different files produce different hash"

    teardown
}

test_manifest_functions() {
    echo "=== test_manifest_functions ==="
    setup
    source_functions

    # Test write_manifest_header
    local mf="$TEST_TMPDIR/test-manifest"
    write_manifest_header "abc123" "1.0.0" "$mf"
    assert_file_exists "$mf" "manifest file created"
    assert_true 'grep -q "upstream_commit=abc123" "$mf"' "manifest has commit"
    assert_true 'grep -q "version=1.0.0" "$mf"' "manifest has version"

    # Test add_manifest_entry
    add_manifest_entry ".claude/skills/test/SKILL.md" "deadbeef" "1.0.0" "$mf"
    assert_true 'grep -q ".claude/skills/test/SKILL.md:deadbeef:1.0.0" "$mf"' "manifest entry added"

    # Test get_manifest_entry
    MANIFEST_FILE="$mf"
    local entry
    entry=$(get_manifest_entry ".claude/skills/test/SKILL.md") || true
    assert_eq "deadbeef:1.0.0" "$entry" "get_manifest_entry returns hash:version"

    # Test is_in_manifest
    assert_true 'is_in_manifest ".claude/skills/test/SKILL.md"' "is_in_manifest returns true for tracked file"
    assert_false 'is_in_manifest ".claude/skills/nonexistent/SKILL.md"' "is_in_manifest returns false for untracked file"

    # Test is_upstream_skill
    assert_true 'is_upstream_skill "test"' "is_upstream_skill returns true for tracked skill"
    assert_false 'is_upstream_skill "my-custom-skill"' "is_upstream_skill returns false for untracked skill"

    # Test get_manifest_paths
    local paths
    paths=$(get_manifest_paths)
    assert_true 'echo "$paths" | grep -q ".claude/skills/test/SKILL.md"' "get_manifest_paths lists tracked paths"

    teardown
}

test_sync_file() {
    echo "=== test_sync_file ==="
    setup
    source_functions

    MANIFEST_TEMP=$(mktemp)
    write_manifest_header "abc123" "1.0.0" "$MANIFEST_TEMP"

    # Test: create new file
    FILES_CREATED=0
    FILES_UPDATED=0
    FILES_UNCHANGED=0
    sync_file \
        "$TEST_TMPDIR/upstream/.claude/lib/core.js" \
        "$PROJECT_ROOT/.claude/lib/core.js" \
        ".claude/lib/core.js" \
        "1.0.0"
    assert_file_exists "$PROJECT_ROOT/.claude/lib/core.js" "new file created"
    assert_eq "1" "$FILES_CREATED" "FILES_CREATED incremented"

    # Test: unchanged file (sync same content again)
    FILES_CREATED=0
    FILES_UPDATED=0
    FILES_UNCHANGED=0
    sync_file \
        "$TEST_TMPDIR/upstream/.claude/lib/core.js" \
        "$PROJECT_ROOT/.claude/lib/core.js" \
        ".claude/lib/core.js" \
        "1.0.0"
    assert_eq "0" "$FILES_CREATED" "FILES_CREATED not incremented for unchanged"
    assert_eq "0" "$FILES_UPDATED" "FILES_UPDATED not incremented for unchanged"
    assert_eq "1" "$FILES_UNCHANGED" "FILES_UNCHANGED incremented"

    # Test: updated file (change upstream content)
    echo "// updated lib code" > "$TEST_TMPDIR/upstream/.claude/lib/core.js"
    FILES_CREATED=0
    FILES_UPDATED=0
    FILES_UNCHANGED=0
    sync_file \
        "$TEST_TMPDIR/upstream/.claude/lib/core.js" \
        "$PROJECT_ROOT/.claude/lib/core.js" \
        ".claude/lib/core.js" \
        "1.0.0"
    assert_eq "1" "$FILES_UPDATED" "FILES_UPDATED incremented for changed file"
    assert_file_content "$PROJECT_ROOT/.claude/lib/core.js" "// updated lib code" "file content updated"

    # Test: manifest entry written
    assert_true 'grep -q ".claude/lib/core.js:" "$MANIFEST_TEMP"' "manifest entry written for synced file"

    rm -f "$MANIFEST_TEMP"
    teardown
}

test_sync_directory() {
    echo "=== test_sync_directory ==="
    setup
    source_functions

    MANIFEST_TEMP=$(mktemp)
    write_manifest_header "abc123" "1.0.0" "$MANIFEST_TEMP"

    FILES_CREATED=0
    FILES_UPDATED=0
    FILES_UNCHANGED=0

    # Sync skill-a from upstream to project
    sync_directory \
        "$TEST_TMPDIR/upstream/.claude/skills/skill-a" \
        "$PROJECT_ROOT/.claude/skills/skill-a" \
        ".claude/skills/skill-a" \
        "1.0.0"

    assert_file_exists "$PROJECT_ROOT/.claude/skills/skill-a/SKILL.md" "skill-a/SKILL.md synced"
    assert_file_exists "$PROJECT_ROOT/.claude/skills/skill-a/references/ref.md" "skill-a/references/ref.md synced"
    assert_true '[[ $FILES_CREATED -ge 2 ]]' "at least 2 files created"

    rm -f "$MANIFEST_TEMP"
    teardown
}

test_get_local_skills() {
    echo "=== test_get_local_skills ==="
    setup
    source_functions

    # Create manifest tracking skill-a
    local mf="$MANIFEST_FILE"
    write_manifest_header "abc123" "1.0.0" "$mf"
    add_manifest_entry ".claude/skills/skill-a/SKILL.md" "hash1" "1.0.0" "$mf"

    # Create local skills in project
    mkdir -p "$PROJECT_ROOT/.claude/skills/skill-a"
    echo "# A" > "$PROJECT_ROOT/.claude/skills/skill-a/SKILL.md"
    mkdir -p "$PROJECT_ROOT/.claude/skills/my-custom"
    echo "# Custom" > "$PROJECT_ROOT/.claude/skills/my-custom/SKILL.md"

    local locals
    locals=$(get_local_skills)
    assert_true 'echo "$locals" | grep -q "my-custom"' "my-custom is detected as local"
    assert_false 'echo "$locals" | grep -q "skill-a"' "skill-a is NOT detected as local"

    teardown
}

test_dry_run() {
    echo "=== test_dry_run ==="
    setup
    source_functions

    DRY_RUN=true
    MANIFEST_TEMP=$(mktemp)
    write_manifest_header "abc123" "1.0.0" "$MANIFEST_TEMP"

    FILES_CREATED=0
    FILES_UPDATED=0

    # Sync in dry-run — file should NOT be created
    sync_file \
        "$TEST_TMPDIR/upstream/.claude/lib/core.js" \
        "$PROJECT_ROOT/.claude/lib/new-file.js" \
        ".claude/lib/new-file.js" \
        "1.0.0"

    assert_false '[[ -f "$PROJECT_ROOT/.claude/lib/new-file.js" ]]' "file NOT created in dry-run"
    assert_eq "1" "$FILES_CREATED" "FILES_CREATED still counted in dry-run"

    rm -f "$MANIFEST_TEMP"
    DRY_RUN=false
    teardown
}

test_backup_rotation() {
    echo "=== test_backup_rotation ==="
    setup
    source_functions

    MAX_BACKUPS=2

    # Create fake backup directories with different timestamps
    mkdir -p "$PROJECT_ROOT/.claude-backup_20260101_010101/.claude"
    mkdir -p "$PROJECT_ROOT/.claude-backup_20260102_020202/.claude"
    mkdir -p "$PROJECT_ROOT/.claude-backup_20260103_030303/.claude"
    mkdir -p "$PROJECT_ROOT/.claude-backup_20260104_040404/.claude"

    cleanup_old_backups

    # Should keep only 2 most recent
    local count
    count=$(ls -d "$PROJECT_ROOT/.claude-backup_"* 2>/dev/null | wc -l | tr -d ' ')
    assert_eq "2" "$count" "only 2 backups remain after cleanup"

    teardown
}

test_parse_args() {
    echo "=== test_parse_args ==="
    setup
    source_functions

    local action

    DRY_RUN=false
    FORCE=false
    VERBOSE=false
    action=$(parse_args)
    assert_eq "update" "$action" "no args -> update action"

    action=$(parse_args --status)
    assert_eq "status" "$action" "status -> status action"

    action=$(parse_args --init-manifest)
    assert_eq "init-manifest" "$action" "init-manifest -> init-manifest action"

    # Test flag side effects by calling parse_args directly (not in subshell)
    # We redirect stdout to capture the action while preserving variable changes
    DRY_RUN=false
    parse_args --dry-run > /dev/null
    assert_eq "true" "$DRY_RUN" "dry-run flag set"

    FORCE=false
    VERBOSE=false
    parse_args --force --verbose > /dev/null
    assert_eq "true" "$FORCE" "force flag set"
    assert_eq "true" "$VERBOSE" "verbose flag set"

    teardown
}

# Run all tests
run_all_tests() {
    echo ""
    echo "Running update-skills.sh unit tests..."
    echo "======================================="
    echo ""

    test_get_file_hash
    echo ""
    test_manifest_functions
    echo ""
    test_sync_file
    echo ""
    test_sync_directory
    echo ""
    test_get_local_skills
    echo ""
    test_dry_run
    echo ""
    test_backup_rotation
    echo ""
    test_parse_args
    echo ""

    echo "======================================="
    echo -e "Results: ${GREEN}$TESTS_PASSED passed${NC}, ${RED}$TESTS_FAILED failed${NC}, $TESTS_TOTAL total"
    echo ""

    if [[ $TESTS_FAILED -gt 0 ]]; then
        exit 1
    fi
}

run_all_tests

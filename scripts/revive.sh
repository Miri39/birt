#!/usr/bin/env bash
# Undo scripts/kill.sh: enable the agent workflows and set a new AGENT_TOKEN (you paste it when asked).
# Usage: bash scripts/revive.sh
set -u
REPO="${REPO:-Miri39/birt}"
for f in dispatcher agent-author agent-review agent-repair qa-daily planner; do gh workflow enable "$f.yml" -R "$REPO" 2>/dev/null & done
wait
gh secret set AGENT_TOKEN -R "$REPO"
echo "agents enabled"

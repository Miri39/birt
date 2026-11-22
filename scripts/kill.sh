#!/usr/bin/env bash
# Kill switch: stops every agent. Disables the agent workflows, cancels running ones, deletes the agent token.
# Usage: bash scripts/kill.sh
set -u
REPO="${REPO:-Miri39/birt}"
FLOWS="dispatcher agent-author agent-review agent-repair qa-daily planner"
START=$SECONDS

for f in $FLOWS; do gh workflow disable "$f.yml" -R "$REPO" 2>/dev/null & done
wait
for f in $FLOWS; do
  for s in in_progress queued; do
    for id in $(gh run list -R "$REPO" --workflow "$f.yml" --status "$s" --json databaseId --jq '.[].databaseId' 2>/dev/null); do
      gh run cancel "$id" -R "$REPO" & 
    done
  done
done
wait
gh secret delete AGENT_TOKEN -R "$REPO"
echo "all agents stopped in $((SECONDS - START)) s"

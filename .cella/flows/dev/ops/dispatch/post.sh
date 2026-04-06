#!/bin/sh
RESULT="$OP_WORKSPACE/dispatch.json"

if [ ! -f "$RESULT" ]; then
  cellx flow retry
  exit 0
fi

# check if all scenarios done
if jq -e '.done' "$RESULT" >/dev/null 2>&1; then
  cellx flow done
  exit 0
fi

# extract scenario and first issue, pass as params to implement
PARAMS=$(jq -c '{scenario: .scenario, issues: .issues, current: 0}' "$RESULT")
cellx flow to implement --params "$PARAMS"

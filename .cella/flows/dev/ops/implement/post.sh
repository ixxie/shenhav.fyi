#!/bin/sh
if [ "$OP_EXIT_CODE" -ne 0 ]; then
  cellx flow retry
  exit 0
fi

# parse params
CURRENT=$(echo "$OP_PARAMS" | jq -r '.current')
TOTAL=$(echo "$OP_PARAMS" | jq -r '.issues | length')
NEXT=$((CURRENT + 1))

if [ "$NEXT" -lt "$TOTAL" ]; then
  # more sub-issues: loop back with incremented index
  PARAMS=$(echo "$OP_PARAMS" | jq -c ".current = $NEXT")
  cellx flow to implement --params "$PARAMS"
else
  # all sub-issues done: move to validate
  PARAMS=$(echo "$OP_PARAMS" | jq -c '{scenario: .scenario}')
  cellx flow to validate --params "$PARAMS"
fi

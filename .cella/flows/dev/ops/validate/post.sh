#!/bin/sh
if [ "$OP_EXIT_CODE" -eq 0 ]; then
  # scenario passed — back to dispatch for next scenario
  cellx flow to dispatch
else
  # validation failed — send to fix with failure context
  PARAMS=$(echo "$OP_PARAMS" | jq -c ". + {failure: \"validation failed with exit code $OP_EXIT_CODE\"}")
  cellx flow to fix --params "$PARAMS"
fi

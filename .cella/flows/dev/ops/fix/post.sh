#!/bin/sh
if [ "$OP_EXIT_CODE" -eq 0 ]; then
  # fix succeeded — re-validate
  PARAMS=$(echo "$OP_PARAMS" | jq -c 'del(.failure)')
  cellx flow to validate --params "$PARAMS"
else
  cellx flow retry
fi

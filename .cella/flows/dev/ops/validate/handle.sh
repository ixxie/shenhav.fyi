#!/bin/sh
cd /shenhav.fyi

# start dev server for the agent to inspect
cellx service start devserver 'bun run dev --host 0.0.0.0'
sleep 3

# run the agent harness (flow-level handle.sh uses opencode)
opencode run -m "$PARAM_MODEL" "$OP_PROMPT"
EXIT=$?

# stop dev server
cellx service stop devserver

exit $EXIT

#!/bin/sh
# validate overrides the agent handle — this is pure script
cd /shenhav.fyi

# start dev server as a background service
cellx service start devserver 'bun run dev --host 0.0.0.0'
sleep 3

# run build check
bun run build
BUILD_EXIT=$?

# run playwright if build passes
if [ $BUILD_EXIT -eq 0 ] && command -v playwright >/dev/null 2>&1; then
  npx playwright test 2>&1
  TEST_EXIT=$?
else
  TEST_EXIT=$BUILD_EXIT
fi

# stop dev server
cellx service stop devserver

exit $TEST_EXIT

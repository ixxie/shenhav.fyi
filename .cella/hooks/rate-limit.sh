#!/bin/sh
# Monitor Claude Code for rate limits and auto-continue when reset.
# Uses the `session` command provided by cella:
#   session read  — capture current pane content
#   session send  — send keystrokes to the pane

POLL=10
WAIT_POLL=60

while true; do
  content=$(session read)

  if echo "$content" | grep -qE "limit reached.*resets"; then
    # extract reset time (e.g. "3pm", "11:30am")
    reset_time=$(echo "$content" | grep -oE "resets [0-9:]+(am|pm)" | head -1 | sed 's/resets //')

    if [ -n "$reset_time" ]; then
      echo "rate limit hit, resets at $reset_time"

      # poll until we're past the reset time
      while true; do
        now=$(date +%s)
        # convert reset_time to epoch — use date parsing
        target=$(date -d "$reset_time" +%s 2>/dev/null || date -j -f "%I:%M%p" "$reset_time" +%s 2>/dev/null)

        if [ -n "$target" ] && [ "$now" -ge "$target" ]; then
          echo "reset time reached, sending continue"
          sleep 30  # safety margin
          session send "continue"
          break
        fi

        echo "waiting for reset ($reset_time), sleeping ${WAIT_POLL}s"
        sleep "$WAIT_POLL"
      done
    else
      # couldn't parse time, wait 5 hours as fallback
      echo "rate limit hit but couldn't parse reset time, waiting 5h"
      sleep 18000
      session send "continue"
    fi
  fi

  sleep "$POLL"
done

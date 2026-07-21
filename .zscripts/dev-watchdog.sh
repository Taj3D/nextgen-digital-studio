#!/bin/bash
# Persistent dev server watchdog — restarts Next.js if it crashes
cd /home/z/my-project
export NODE_OPTIONS="--max-old-space-size=1024"

while true; do
  echo "[$(date)] Starting Next.js dev server (webpack mode)..."
  bun run next dev -p 3000 --webpack > /home/z/my-project/dev.log 2>&1
  SERVER_PID=$!
  echo "[$(date)] Server PID: $SERVER_PID"

  # Wait for server to be ready
  for i in $(seq 1 30); do
    if ss -tlnp 2>/dev/null | grep -q ":3000"; then
      echo "[$(date)] Server ready on port 3000"
      break
    fi
    sleep 1
  done

  # Wait for process to exit
  wait $SERVER_PID
  EXIT_CODE=$?
  echo "[$(date)] Server exited with code $EXIT_CODE, restarting in 3s..."
  sleep 3
done

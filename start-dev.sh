#!/bin/bash
# Persistent Next.js dev server launcher
# Uses setsid + nohup + full FD redirection so the process survives parent shell exit
cd /home/z/my-project

# Kill any existing instances
pkill -9 -f "next-server" 2>/dev/null
pkill -9 -f "next dev" 2>/dev/null
sleep 1

# Launch fully detached: new session, no controlling terminal, all FDs redirected
# Using node directly (not bun) for better memory management with NODE_OPTIONS
NODE_OPTIONS="--max-old-space-size=2048" setsid nohup \
  node node_modules/next/dist/bin/next dev -p 3000 \
  </dev/null >/home/z/my-project/dev.log 2>&1 &

DEV_PID=$!
echo "Dev server PID: $DEV_PID"

# Wait for it to be ready
for i in $(seq 1 10); do
  sleep 1
  if ss -tlnp 2>/dev/null | grep -q ":3000"; then
    echo "Dev server is listening on port 3000"
    # Save PID for later management
    echo $DEV_PID > /home/z/my-project/.dev-pid
    exit 0
  fi
  if ! kill -0 $DEV_PID 2>/dev/null; then
    echo "Dev server died during startup"
    exit 1
  fi
done
echo "Dev server did not start in time"
exit 1

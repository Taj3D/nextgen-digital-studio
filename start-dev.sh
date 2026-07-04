#!/bin/bash
# Stable dev server startup script
cd /home/z/my-project
pkill -9 -f "next\|bun\|chrome" 2>/dev/null
sleep 5
rm -rf .next/cache 2>/dev/null
nohup bun run dev > dev.log 2>&1 &
echo "Dev server started with PID $!"
sleep 20
echo "Status:"
pgrep -af "next-server" | head -1
curl -s -o /dev/null -w "Homepage: %{http_code}\n" http://localhost:3000/

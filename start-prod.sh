#!/bin/bash
# Stable production server runner
cd /home/z/my-project
pkill -9 -f "next" 2>/dev/null
sleep 3

# Start production server with maximum stability
exec node node_modules/.bin/next start -p 3000

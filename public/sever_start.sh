#!/usr/bin/env bash

# Add nvm to port
export PATH=/home/pi/.config/nvm/versions/node/v16.14.0/bin:$PATH
echo $PATH

# Kill all old processes using Port 12345
kill $(lsof -t -i:12345)

#Start server
serve ./ -s -l 12345 &
chromium-browser --start-fullscreen http://localhost:12345

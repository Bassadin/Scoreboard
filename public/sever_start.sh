#!/usr/bin/env bash
export PATH=/home/pi/.config/nvm/versions/node/v16.14.0/bin:$PATH
echo $PATH
serve -s -l 12345 &
chromium-browser http://localhost:12345
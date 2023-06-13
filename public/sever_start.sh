#!/usr/bin/env bash

cd ../
yarn preview --port 3000 &
sleep 3
chromium-browser --start-fullscreen http://localhost:3000
sudo nano /etc/rc.local

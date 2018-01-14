#!/bin/bash

set -e

SERVER=sushil@103.253.147.79
APP_DIR=/home/sushil/telco-technician


set -x

yarn build
rsync -avzP build/ $SERVER:$APP_DIR
ssh $SERVER "pm2 restart index"
rm -rf build
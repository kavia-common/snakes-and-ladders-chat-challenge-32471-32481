#!/bin/bash
cd /home/kavia/workspace/code-generation/snakes-and-ladders-chat-challenge-32471-32481/snakes_and_ladders_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


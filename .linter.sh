#!/bin/bash
cd /home/kavia/workspace/code-generation/piggyhabit-16010-5a2e0c7a/piggyhabit
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


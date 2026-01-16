#!/bin/bash
# usage: gpush.sh "commit message"

git add .
git commit -m "${1:-amendments}"
git push origin main

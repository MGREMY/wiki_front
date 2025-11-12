#!/bin/bash

if [ $# -ne 1 ]; then
  echo "Usage: $0 <snake-case_replacement>"
  exit 1
fi

KEBAB_CASE=$1

# Replace in file contents
echo "Replace in file contents"
find . -type f -not -path './.git/*' -exec sed -i "s/wiki/$KEBAB_CASE/g; s/wiki/$KEBAB_CASE/g" {} +

# Rename files and directories containing wiki (deepest first)
echo "Rename files and directories containing wiki (deepest first)"
find . -depth -not -path './.git/*' -name "*wiki*" -exec bash -c '
  dir=$(dirname "$0")
  base=$(basename "$0")
  newbase=${base//wiki/$1}
  mv "$0" "$dir/$newbase"
' {} "$KEBAB_CASE" \;

# Warn user
echo "You will need to update manually the realm name and the client id in `apps/wiki/src/environments/environment.development.ts` file"

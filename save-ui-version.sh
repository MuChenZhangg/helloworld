#!/usr/bin/env bash

# Save the git commit SHA and date from the current branch as JSON in a file
# imported by the About page.
# If git metadata is unavailable (e.g. building on a platform that does not
# include .git), keep the existing committed version.json and skip.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VERSION_JSON="$SCRIPT_DIR/src/views/About/version.json"

if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  echo "Not a git repository; skipping version.json generation."
  exit 0
fi

commit_sha=$(git rev-parse --short HEAD)
commit_date=$(git log -1 --format="%at" | xargs -I{} date -u -d @{} +"%Y/%m/%d %H:%M:%S %Z")

cat << EOF > "$VERSION_JSON"
{
  "commit": "$commit_sha",
  "date": "$commit_date"
}
EOF

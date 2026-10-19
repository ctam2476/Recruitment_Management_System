#!/usr/bin/env bash
set -euo pipefail
: "${MONGO_URI:?Hãy export MONGO_URI trước khi chạy}"
DB_NAME="${DB_NAME:-hr_recruitment}"
DATA_DIR="${DATA_DIR:-data}"
for file in "$DATA_DIR"/*.json; do
  collection="$(basename "$file" .json)"
  printf 'Importing %s -> %s.%s\n' "$file" "$DB_NAME" "$collection"
  mongoimport --uri="$MONGO_URI" --db="$DB_NAME" --collection="$collection" --file="$file" --jsonArray --mode=upsert --upsertFields=_id
 done
printf 'Import complete: %s\n' "$DB_NAME"

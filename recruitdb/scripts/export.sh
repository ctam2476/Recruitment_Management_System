#!/usr/bin/env bash
set -euo pipefail
: "${MONGO_URI:?Hãy export MONGO_URI trước khi chạy}"
DB_NAME="${DB_NAME:-hr_recruitment}"
OUT_DIR="${1:-exports/$(date +%Y%m%d-%H%M%S)}"
mkdir -p "$OUT_DIR"
for collection in users job_postings candidates applications interviews; do
  printf 'Exporting %s.%s\n' "$DB_NAME" "$collection"
  mongoexport --uri="$MONGO_URI" --db="$DB_NAME" --collection="$collection" --jsonFormat=canonical --out="$OUT_DIR/${collection}.json"
done
printf 'Export complete: %s\n' "$OUT_DIR"

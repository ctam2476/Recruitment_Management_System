#!/usr/bin/env bash
set -euo pipefail
: "${MONGO_URI:?Hãy export MONGO_URI trước khi chạy}"
DB_NAME="${DB_NAME:-hr_recruitment}"
OUT_ROOT="${BACKUP_DIR:-backups}"
STAMP="$(date +%Y%m%d-%H%M%S)"
TARGET="$OUT_ROOT/${DB_NAME}-${STAMP}"
mkdir -p "$OUT_ROOT"
printf 'Backing up %s to %s\n' "$DB_NAME" "$TARGET"
mongodump --uri="$MONGO_URI" --db="$DB_NAME" --gzip --out="$TARGET"
printf 'Backup complete: %s\n' "$TARGET"

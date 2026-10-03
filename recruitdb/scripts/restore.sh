#!/usr/bin/env bash
set -euo pipefail
: "${MONGO_URI:?Hãy export MONGO_URI trước khi chạy}"
DB_NAME="${DB_NAME:-hr_recruitment}"
SOURCE="${1:?Cách dùng: bash scripts/restore.sh backups/hr_recruitment-YYYYMMDD-HHMMSS}"
if [[ ! -d "$SOURCE" ]]; then echo "Không tìm thấy backup: $SOURCE" >&2; exit 1; fi
read -r -p "Restore $SOURCE vào $DB_NAME? (gõ YES để tiếp tục): " confirm
[[ "$confirm" == "YES" ]] || { echo "Đã hủy."; exit 0; }
mongorestore --uri="$MONGO_URI" --nsFrom="${DB_NAME}.*" --nsTo="${DB_NAME}.*" --gzip --drop "$SOURCE"
printf 'Restore complete: %s\n' "$DB_NAME"

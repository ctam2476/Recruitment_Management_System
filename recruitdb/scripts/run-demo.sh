#!/usr/bin/env bash
set -euo pipefail
npm run check
exec node server.mjs

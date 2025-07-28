#!/bin/bash

NEXTBASE_DIR="/workspaces/nextbase-v3"
HAIEC_DIR="/workspaces/haiec-compliance-platform"

LOG_FILE="$HAIEC_DIR/integration.log"
mkdir -p "$(dirname "$LOG_FILE")"
echo "Integration started at $(date)" > "$LOG_FILE"

copy_folder() {
    local src="$1"
    local dst="$2"
    echo "Copying $src → $dst" | tee -a "$LOG_FILE"
    mkdir -p "$dst"
    cp -rn "$src"/* "$dst"/ 2>>"$LOG_FILE"
}

copy_file() {
    local src="$1"
    local dst="$2"
    echo "Copying file $src → $dst" | tee -a "$LOG_FILE"
    mkdir -p "$(dirname "$dst")"
    cp -n "$src" "$dst" 2>>"$LOG_FILE"
}

copy_folder "$NEXTBASE_DIR/app/(auth)" "$HAIEC_DIR/haiec-portal/app/(auth)"
copy_folder "$NEXTBASE_DIR/app/settings" "$HAIEC_DIR/haiec-portal/app/settings"
copy_folder "$NEXTBASE_DIR/app/admin" "$HAIEC_DIR/haiec-portal/app/admin"
copy_folder "$NEXTBASE_DIR/app/billing" "$HAIEC_DIR/haiec-portal/app/billing"
copy_folder "$NEXTBASE_DIR/components/ui" "$HAIEC_DIR/haiec-portal/components/ui"
copy_folder "$NEXTBASE_DIR/components/layout" "$HAIEC_DIR/haiec-portal/components/layout"
copy_file "$NEXTBASE_DIR/lib/auth.ts" "$HAIEC_DIR/haiec-portal/lib/auth.ts"
copy_file "$NEXTBASE_DIR/lib/stripe.ts" "$HAIEC_DIR/haiec-portal/lib/stripe.ts"
copy_file "$NEXTBASE_DIR/middleware.ts" "$HAIEC_DIR/haiec-portal/middleware.ts"
copy_file "$NEXTBASE_DIR/next.config.js" "$HAIEC_DIR/haiec-portal/next.config.js"
copy_file "$NEXTBASE_DIR/tailwind.config.js" "$HAIEC_DIR/haiec-portal/tailwind.config.js"
copy_file "$NEXTBASE_DIR/.env.example" "$HAIEC_DIR/haiec-portal/.env.example"
copy_file "$NEXTBASE_DIR/prisma/schema.prisma" "$HAIEC_DIR/haiec-portal/prisma/schema.prisma"
copy_folder "$NEXTBASE_DIR/public" "$HAIEC_DIR/haiec-portal/public"

echo "Integration completed at $(date)" >> "$LOG_FILE"
echo "✅ Done. Check $LOG_FILE for details."

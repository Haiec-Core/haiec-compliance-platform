#!/bin/bash

HAIEC_DIR="/workspaces/haiec-compliance-platform"
LOG_FILE="$HAIEC_DIR/integration-extended.log"
mkdir -p "$(dirname "$LOG_FILE")"
echo "Extended integration started at $(date)" > "$LOG_FILE"

copy_folder() {
    local src="$1"
    local dst="$2"
    if [ -d "$src" ]; then
        echo "Copying $src → $dst" | tee -a "$LOG_FILE"
        mkdir -p "$dst"
        cp -rn "$src"/* "$dst"/ 2>>"$LOG_FILE"
    else
        echo "Skipping $src (not found)" | tee -a "$LOG_FILE"
    fi
}

copy_file() {
    local src="$1"
    local dst="$2"
    if [ -f "$src" ]; then
        echo "Copying file $src → $dst" | tee -a "$LOG_FILE"
        mkdir -p "$(dirname "$dst")"
        cp -n "$src" "$dst" 2>>"$LOG_FILE"
    else
        echo "Skipping file $src (not found)" | tee -a "$LOG_FILE"
    fi
}

# ULTIMATE
BASE_ULTIMATE="/workspaces/nextbase-ultimate"
copy_folder "$BASE_ULTIMATE/app/(auth)" "$HAIEC_DIR/haiec-portal/app/(auth)"
copy_folder "$BASE_ULTIMATE/app/settings" "$HAIEC_DIR/haiec-portal/app/settings"
copy_folder "$BASE_ULTIMATE/app/admin" "$HAIEC_DIR/haiec-portal/app/admin"
copy_folder "$BASE_ULTIMATE/app/billing" "$HAIEC_DIR/haiec-portal/app/billing"
copy_folder "$BASE_ULTIMATE/components/ui" "$HAIEC_DIR/haiec-portal/components/ui"
copy_folder "$BASE_ULTIMATE/components/layout" "$HAIEC_DIR/haiec-portal/components/layout"
copy_file "$BASE_ULTIMATE/lib/auth.ts" "$HAIEC_DIR/haiec-portal/lib/auth.ts"
copy_file "$BASE_ULTIMATE/lib/stripe.ts" "$HAIEC_DIR/haiec-portal/lib/stripe.ts"
copy_file "$BASE_ULTIMATE/middleware.ts" "$HAIEC_DIR/haiec-portal/middleware.ts"
copy_file "$BASE_ULTIMATE/next.config.js" "$HAIEC_DIR/haiec-portal/next.config.js"
copy_file "$BASE_ULTIMATE/tailwind.config.js" "$HAIEC_DIR/haiec-portal/tailwind.config.js"
copy_file "$BASE_ULTIMATE/.env.example" "$HAIEC_DIR/haiec-portal/.env.example"
copy_file "$BASE_ULTIMATE/prisma/schema.prisma" "$HAIEC_DIR/haiec-portal/prisma/schema.prisma"
copy_folder "$BASE_ULTIMATE/public" "$HAIEC_DIR/haiec-portal/public"

# COMPONENT KIT
COMP_KIT="/workspaces/nextbase-component-kit"
copy_folder "$COMP_KIT/components" "$HAIEC_DIR/haiec-portal/components/ui"
copy_folder "$COMP_KIT/hooks" "$HAIEC_DIR/haiec-portal/hooks"
copy_file "$COMP_KIT/lib/utils.ts" "$HAIEC_DIR/haiec-portal/lib/utils.ts"

# TEAMS ONLY
TEAMS_ONLY="/workspaces/nextbase-teams-only-ultimate"
copy_folder "$TEAMS_ONLY/app/teams" "$HAIEC_DIR/haiec-portal/app/teams"
copy_folder "$TEAMS_ONLY/app/roles" "$HAIEC_DIR/haiec-portal/app/roles"

# LANDING KIT
LANDING_KIT="/workspaces/nextbase-landing-kit"
copy_folder "$LANDING_KIT/app" "$HAIEC_DIR/haiec-portal/app/public"
copy_folder "$LANDING_KIT/public" "$HAIEC_DIR/haiec-portal/public"

# AI STARTER
AI_STARTER="/workspaces/nextbase-ai-starter"
copy_folder "$AI_STARTER/app/ai" "$HAIEC_DIR/haiec-portal/app/ai"
copy_folder "$AI_STARTER/lib/ai" "$HAIEC_DIR/haiec-portal/lib/langchain"
copy_file "$AI_STARTER/lib/aiClient.ts" "$HAIEC_DIR/haiec-portal/lib/aiClient.ts"

echo "Extended integration completed at $(date)" >> "$LOG_FILE"
echo "✅ All Nextbase modules synced. Check $LOG_FILE for summary."

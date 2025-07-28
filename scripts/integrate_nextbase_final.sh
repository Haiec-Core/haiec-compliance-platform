#!/bin/bash

HAIEC_DIR="/workspaces/haiec-compliance-platform"
LOG_FILE="$HAIEC_DIR/integration-final.log"
mkdir -p "$(dirname "$LOG_FILE")"
echo "Final integration started at $(date)" > "$LOG_FILE"

copy_folder_unique() {
    local src="$1"
    local dst="$2"
    if [ -d "$src" ]; then
        mkdir -p "$dst"
        for file in "$src"/*; do
            base=$(basename "$file")
            target="$dst/$base"
            if [ ! -e "$target" ]; then
                cp -rn "$file" "$target"
                echo "Copied $file to $target" | tee -a "$LOG_FILE"
            else
                echo "Skipped $file (already exists)" | tee -a "$LOG_FILE"
            fi
        done
    else
        echo "Skipping $src (not found)" | tee -a "$LOG_FILE"
    fi
}

copy_file_unique() {
    local src="$1"
    local dst="$2"
    if [ -f "$src" ]; then
        if [ ! -f "$dst" ]; then
            mkdir -p "$(dirname "$dst")"
            cp -n "$src" "$dst"
            echo "Copied $src to $dst" | tee -a "$LOG_FILE"
        else
            echo "Skipped $src (already exists at $dst)" | tee -a "$LOG_FILE"
        fi
    else
        echo "Skipping $src (not found)" | tee -a "$LOG_FILE"
    fi
}

# TEAMS ONLY
TEAMS_ONLY="/workspaces/nextbase-teams-only-ultimate"
copy_folder_unique "$TEAMS_ONLY/app/teams" "$HAIEC_DIR/haiec-portal/app/teams"
copy_folder_unique "$TEAMS_ONLY/app/roles" "$HAIEC_DIR/haiec-portal/app/roles"

# COMPONENT KIT
COMP_KIT="/workspaces/nextbase-component-kit"
copy_folder_unique "$COMP_KIT/components" "$HAIEC_DIR/haiec-portal/components/ui"
copy_folder_unique "$COMP_KIT/hooks" "$HAIEC_DIR/haiec-portal/hooks"
copy_file_unique "$COMP_KIT/lib/utils.ts" "$HAIEC_DIR/haiec-portal/lib/utils.ts"

# AI STARTER
AI_STARTER="/workspaces/nextbase-ai-starter"
copy_folder_unique "$AI_STARTER/app/ai" "$HAIEC_DIR/haiec-portal/app/ai"
copy_folder_unique "$AI_STARTER/lib/ai" "$HAIEC_DIR/haiec-portal/lib/langchain"
copy_file_unique "$AI_STARTER/lib/aiClient.ts" "$HAIEC_DIR/haiec-portal/lib/aiClient.ts"

# LANDING KIT
LANDING_KIT="/workspaces/nextbase-landing-kit"
copy_folder_unique "$LANDING_KIT/app" "$HAIEC_DIR/haiec-portal/app/public"
copy_folder_unique "$LANDING_KIT/public" "$HAIEC_DIR/haiec-portal/public"

# BIAS ENGINE
BIAS_ENGINE="/workspaces/bias-engine"
copy_folder_unique "$BIAS_ENGINE" "$HAIEC_DIR/bias-audit-engine"

echo "Final integration completed at $(date)" >> "$LOG_FILE"
echo "✅ All requested modules copied without duplicates. See $LOG_FILE for details."

CREATE TABLE IF NOT EXISTS "public"."marketing_changelog" (
  "id" "uuid" PRIMARY KEY DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  "title" character varying(255) NOT NULL,
  "json_content" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
  "created_at" timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP,
  "cover_image" "text",
  "status" "public"."marketing_changelog_status" DEFAULT 'draft'::"public"."marketing_changelog_status" NOT NULL
);

ALTER TABLE "public"."marketing_changelog" OWNER TO "postgres";
ALTER TABLE "public"."marketing_changelog" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "public"."marketing_changelog_author_relationship" (
  "author_id" "uuid" NOT NULL REFERENCES "public"."marketing_author_profiles"("id") ON DELETE CASCADE,
  "changelog_id" "uuid" NOT NULL REFERENCES "public"."marketing_changelog"("id") ON DELETE CASCADE
);

CREATE INDEX idx_marketing_changelog_author_relationship_author_id ON public.marketing_changelog_author_relationship(author_id);
CREATE INDEX idx_marketing_changelog_author_relationship_changelog_id ON public.marketing_changelog_author_relationship(changelog_id);

ALTER TABLE "public"."marketing_changelog_author_relationship" OWNER TO "postgres";
ALTER TABLE "public"."marketing_changelog_author_relationship" ENABLE ROW LEVEL SECURITY;

  -- changelog
-- ... existing code ...
CREATE POLICY "Only published changelogs are visible to everyone" ON "public"."marketing_changelog" FOR
SELECT USING (
    STATUS = 'published'::"public"."marketing_changelog_status"
  );

-- ... existing code ...
CREATE POLICY "Changelog author relationship is visible to everyone" ON "public"."marketing_changelog_author_relationship" FOR
SELECT USING (TRUE);
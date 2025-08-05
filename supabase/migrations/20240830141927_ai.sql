CREATE TABLE IF NOT EXISTS "public"."chats" (
  "id" "text" PRIMARY KEY NOT NULL,
  "user_id" "uuid" NOT NULL REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE,
  "payload" "jsonb",
  "created_at" timestamp WITH time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
  "project_id" "uuid" NOT NULL REFERENCES "public"."projects"("id") ON DELETE CASCADE
);

CREATE INDEX idx_chats_user_id ON public.chats(user_id);
CREATE INDEX idx_chats_project_id ON public.chats(project_id);

ALTER TABLE "public"."chats" OWNER TO "postgres";
ALTER TABLE "public"."chats" ENABLE ROW LEVEL SECURITY;

-- users can do all operations on their own chats
CREATE POLICY "Users can perform all operations on their own chats" ON "public"."chats" FOR ALL USING (
  "user_id" = (
    SELECT auth.uid()
  )
) WITH CHECK (
  "user_id" = (
    SELECT auth.uid()
  )
);
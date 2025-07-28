CREATE TABLE IF NOT EXISTS "public"."marketing_feedback_threads" (
  "id" "uuid" PRIMARY KEY DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  "title" character varying(255) NOT NULL,
  "content" "text" NOT NULL,
  "user_id" "uuid" NOT NULL REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE,
  "created_at" timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "priority" "public"."marketing_feedback_thread_priority" DEFAULT 'low'::"public"."marketing_feedback_thread_priority" NOT NULL,
  "type" "public"."marketing_feedback_thread_type" DEFAULT 'general'::"public"."marketing_feedback_thread_type" NOT NULL,
  "status" "public"."marketing_feedback_thread_status" DEFAULT 'open'::"public"."marketing_feedback_thread_status" NOT NULL,
  "added_to_roadmap" boolean DEFAULT false NOT NULL,
  "open_for_public_discussion" boolean DEFAULT false NOT NULL,
  "is_publicly_visible" boolean DEFAULT false NOT NULL,
  "moderator_hold_category" "public"."marketing_feedback_moderator_hold_category" DEFAULT NULL
);

CREATE INDEX idx_marketing_feedback_threads_user_id ON public.marketing_feedback_threads(user_id);

ALTER TABLE "public"."marketing_feedback_threads" OWNER TO "postgres";
ALTER TABLE "public"."marketing_feedback_threads" ENABLE ROW LEVEL SECURITY;


CREATE TABLE IF NOT EXISTS "public"."marketing_feedback_comments" (
  "id" "uuid" PRIMARY KEY DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  "user_id" "uuid" NOT NULL REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE,
  "thread_id" "uuid" NOT NULL REFERENCES "public"."marketing_feedback_threads"("id") ON DELETE CASCADE,
  "content" "text" NOT NULL,
  "created_at" timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "moderator_hold_category" "public"."marketing_feedback_moderator_hold_category" DEFAULT NULL
);

CREATE INDEX idx_marketing_feedback_comments_user_id ON public.marketing_feedback_comments(user_id);
CREATE INDEX idx_marketing_feedback_comments_thread_id ON public.marketing_feedback_comments(thread_id);


ALTER TABLE "public"."marketing_feedback_comments" OWNER TO "postgres";
ALTER TABLE "public"."marketing_feedback_comments" ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Authenticated users can create feedback comments" ON "public"."marketing_feedback_comments" FOR
INSERT TO "authenticated" WITH CHECK (TRUE);

-- Own user can update comments
CREATE POLICY "Authenticated users can update their own feedback comments" ON "public"."marketing_feedback_comments" FOR
UPDATE USING ("user_id" = "auth"."uid"()) WITH CHECK ("user_id" = "auth"."uid"());

-- Own user can delete comments
CREATE POLICY "Authenticated users can delete their own feedback comments" ON "public"."marketing_feedback_comments" FOR DELETE USING ("user_id" = "auth"."uid"());
-- comments are visible unless moderator hold
CREATE POLICY "Authenticated users can view feedback comments" ON "public"."marketing_feedback_comments" FOR
SELECT USING ("moderator_hold_category" IS NULL);


-- threads
CREATE POLICY "Authenticated users can create feedback threads" ON "public"."marketing_feedback_threads" FOR
INSERT TO "authenticated" WITH CHECK (TRUE);

CREATE POLICY "Authenticated users can delete their own feedback threads" ON "public"."marketing_feedback_threads" FOR DELETE TO "authenticated" USING (
  (
    "user_id" = (
      SELECT "auth"."uid"() AS "uid"
    )
  )
);

CREATE POLICY "Authenticated users can update their own feedback threads" ON "public"."marketing_feedback_threads" FOR
UPDATE TO "authenticated" USING (
    (
      "user_id" = (
        SELECT "auth"."uid"() AS "uid"
      )
    )
  );

CREATE POLICY "Authenticated users can view feedback threads if they are added to the roadmap or if the thread is open for public discussion" ON "public"."marketing_feedback_threads" FOR
SELECT USING (
    (
      ("added_to_roadmap" = TRUE)
      OR (
        "user_id" = (
          SELECT "auth"."uid"() AS "uid"
        )
      )
      OR ("open_for_public_discussion" = TRUE)
      OR ("moderator_hold_category" IS NULL)
    )
  );
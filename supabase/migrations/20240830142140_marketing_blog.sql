CREATE TABLE IF NOT EXISTS "public"."marketing_blog_posts" (
  "id" "uuid" PRIMARY KEY DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  "slug" character varying(255) UNIQUE NOT NULL,
  "title" character varying(255) NOT NULL,
  "summary" "text" NOT NULL,
  "content" "text" NOT NULL,
  "created_at" timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "is_featured" boolean DEFAULT false NOT NULL,
  "status" "public"."marketing_blog_post_status" DEFAULT 'draft'::"public"."marketing_blog_post_status" NOT NULL,
  "cover_image" character varying(255),
  "seo_data" "jsonb",
  "json_content" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL
);


ALTER TABLE "public"."marketing_blog_posts" OWNER TO "postgres";
ALTER TABLE "public"."marketing_blog_posts" ENABLE ROW LEVEL SECURITY;


CREATE TABLE IF NOT EXISTS "public"."marketing_blog_post_tags_relationship" (
  "blog_post_id" "uuid" NOT NULL REFERENCES "public"."marketing_blog_posts"("id") ON DELETE CASCADE,
  "tag_id" "uuid" NOT NULL REFERENCES "public"."marketing_tags"("id") ON DELETE CASCADE
);

CREATE INDEX idx_marketing_blog_post_tags_relationship_blog_post_id ON public.marketing_blog_post_tags_relationship(blog_post_id);
CREATE INDEX idx_marketing_blog_post_tags_relationship_tag_id ON public.marketing_blog_post_tags_relationship(tag_id);

ALTER TABLE "public"."marketing_blog_post_tags_relationship" OWNER TO "postgres";
ALTER TABLE "public"."marketing_blog_post_tags_relationship" ENABLE ROW LEVEL SECURITY;



CREATE TABLE IF NOT EXISTS "public"."marketing_blog_author_posts" (
  "author_id" "uuid" NOT NULL REFERENCES "public"."marketing_author_profiles"("id") ON DELETE CASCADE,
  "post_id" "uuid" NOT NULL REFERENCES "public"."marketing_blog_posts"("id") ON DELETE CASCADE
);

CREATE INDEX idx_marketing_blog_author_posts_author_id ON public.marketing_blog_author_posts(author_id);
CREATE INDEX idx_marketing_blog_author_posts_post_id ON public.marketing_blog_author_posts(post_id);

ALTER TABLE "public"."marketing_blog_author_posts" OWNER TO "postgres";
ALTER TABLE "public"."marketing_blog_author_posts" ENABLE ROW LEVEL SECURITY;

-- Row Level Security
-- published blog posts are visible to everyone
CREATE POLICY "Published blog posts are visible to everyone" ON "public"."marketing_blog_posts" FOR
SELECT USING ("status" = 'published');

-- relationships are visible to everyone
CREATE POLICY "Blog post tags relationship is visible to everyone" ON "public"."marketing_blog_post_tags_relationship" FOR
SELECT USING (TRUE);

-- blog post author relationships are visible to everyone
CREATE POLICY "Blog post author relationships are visible to everyone" ON "public"."marketing_blog_author_posts" FOR
SELECT USING (TRUE);
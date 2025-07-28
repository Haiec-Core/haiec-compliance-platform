CREATE TABLE IF NOT EXISTS "public"."marketing_author_profiles" (
  "id" "uuid" PRIMARY KEY DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  "slug" "text" UNIQUE NOT NULL,
  "display_name" character varying(255) NOT NULL,
  "bio" "text" NOT NULL,
  "avatar_url" character varying(255) NOT NULL,
  "website_url" character varying(255),
  "twitter_handle" character varying(255),
  "facebook_handle" character varying(255),
  "linkedin_handle" character varying(255),
  "instagram_handle" character varying(255),
  "created_at" timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."marketing_author_profiles" OWNER TO "postgres";
ALTER TABLE "public"."marketing_author_profiles" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "public"."marketing_tags" (
  "id" "uuid" PRIMARY KEY DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  "slug" "text" UNIQUE NOT NULL,
  "name" "text" NOT NULL,
  "description" "text"
);

ALTER TABLE "public"."marketing_tags" OWNER TO "postgres";
ALTER TABLE "public"."marketing_tags" ENABLE ROW LEVEL SECURITY;


-- Row Level Security
CREATE POLICY "Author profiles are visible to everyone" ON "public"."marketing_author_profiles" FOR
SELECT USING (TRUE);

CREATE POLICY "Tags are visible to everyone" ON "public"."marketing_tags" FOR
SELECT USING (TRUE);
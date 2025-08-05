INSERT INTO STORAGE.buckets (id, name)
VALUES ('user-assets', 'user-assets') ON CONFLICT DO NOTHING;

INSERT INTO STORAGE.buckets (id, name, public)
VALUES ('public-user-assets', 'public-user-assets', TRUE) ON CONFLICT DO NOTHING;

INSERT INTO STORAGE.buckets (id, name, public)
VALUES ('public-assets', 'public-assets', TRUE) ON CONFLICT DO NOTHING;



CREATE POLICY "Users can manage their own private assets" ON "storage"."objects" FOR ALL TO "authenticated" USING (
  (
    ("bucket_id" = 'user-assets'::"text")
    AND (
      (
        (
          SELECT (
              SELECT "auth"."uid"() AS "uid"
            ) AS "uid"
        )
      )::"text" = ("storage"."foldername"("name")) [1]
    )
  )
);


CREATE POLICY "Users can view public assets of all users" ON "storage"."objects" FOR
SELECT USING (("bucket_id" = 'public-user-assets'::"text"));

CREATE POLICY "Users can upload to their own public assets" ON "storage"."objects" FOR ALL WITH CHECK (
  (
    ("bucket_id" = 'public-user-assets'::"text")
    AND (
      (
        (
          SELECT "auth"."uid"() AS "uid"
        )
      )::"text" = ("storage"."foldername"("name")) [1]
    )
  )
);





CREATE POLICY "Public Access for public-assets 1plzjha_3" ON "storage"."objects" FOR
SELECT USING (("bucket_id" = 'public-assets'::"text"));
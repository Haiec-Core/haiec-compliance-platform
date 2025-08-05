-- ================ UP MIGRATION ================
-- Create a new storage bucket called 'blobs' that is public
INSERT INTO STORAGE.buckets (id, name, public)
VALUES ('blobs', 'blobs', TRUE);


-- Create policy for authenticated users to upload
CREATE POLICY "Authenticated users can upload to blobs" ON STORAGE.objects FOR
INSERT TO authenticated WITH CHECK (bucket_id = 'blobs');


-- ================ DOWN MIGRATION ================
-- Drop the policies
-- DROP POLICY IF EXISTS "Public Access for blobs" ON STORAGE.objects;
-- DROP POLICY IF EXISTS "Authenticated users can upload to blobs" ON STORAGE.objects;
-- DROP POLICY IF EXISTS "User can delete their own objects in blobs" ON STORAGE.objects;
-- -- Remove the bucket
-- DELETE FROM STORAGE.buckets
-- WHERE id = 'blobs';
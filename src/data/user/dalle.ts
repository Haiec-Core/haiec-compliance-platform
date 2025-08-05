"use server";
import { authActionClient } from "@/lib/safe-action";
import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import { generateImageSchema } from "@/utils/zod-schemas/dalle";
import { partition } from "lodash";
import { nanoid } from "nanoid";
import OpenAI from "openai";
import slugify from "slugify";
import urlJoin from "url-join";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateImageAction = authActionClient
  .schema(generateImageSchema)
  .action(async ({ parsedInput: { prompt, size, n }, ctx: { userId } }) => {
    try {
      const response = await openai.images.generate({
        prompt,
        size,
        n,
        user: userId,
        response_format: "b64_json",
      });

      const imageJSONBs: string[] = [];
      response.data.forEach((d) => {
        if (d.b64_json) {
          imageJSONBs.push(d.b64_json);
        }
      });

      const uploadActionResults = Promise.allSettled(
        imageJSONBs.map((i) =>
          convertAndUploadOpenAiImageAction({
            b64_json: i,
          }).then((result) => {
            if (result && result.data) {
              return result.data;
            }
            throw new Error("failed to upload");
          }),
        ),
      );

      const [successfulUploads, failedUploads] = partition(
        await uploadActionResults,
        (result) => result.status === "fulfilled",
      );

      if (failedUploads.length > 0) {
        throw new Error("failed to upload images");
      }

      return successfulUploads.map((result) => result.value);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to generate image: ${error.message}`);
      }
      throw new Error("An unknown error occurred while generating the image");
    }
  });

const convertAndUploadOpenAiImageSchema = z.object({
  b64_json: z.string(),
});

export const convertAndUploadOpenAiImageAction = authActionClient
  .schema(convertAndUploadOpenAiImageSchema)
  .action(async ({ parsedInput: { b64_json } }) => {
    const byteCharacters = atob(b64_json);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    const file = new File([byteArray], nanoid(), { type: "image/png" });
    const formData = new FormData();
    formData.append("file", file);

    const uploadResponse = await uploadOpenAiImageAction({
      formData,
      fileName: file.name,
      fileOptions: { upsert: true },
    });

    if (uploadResponse && "data" in uploadResponse) {
      return uploadResponse.data;
    }

    console.log(uploadResponse);

    throw new Error("upload images failed");
  });

const uploadOpenAiImageSchema = z.object({
  formData: z.instanceof(FormData),
  fileName: z.string(),
  fileOptions: z
    .object({
      upsert: z.boolean(),
    })
    .optional(),
});

export const uploadOpenAiImageAction = authActionClient
  .schema(uploadOpenAiImageSchema)
  .action(
    async ({
      parsedInput: { formData, fileName, fileOptions },
      ctx: { userId },
    }) => {
      const file = formData.get("file");
      if (!file) {
        throw new Error("File is empty");
      }

      const slugifiedFilename = slugify(fileName, {
        lower: true,
        strict: true,
        replacement: "-",
      });

      const userImagesPath = `${userId}/images/${slugifiedFilename}`;

      const { data, error } = await supabaseAdminClient.storage
        .from("public-user-assets")
        .upload(userImagesPath, file, fileOptions);

      if (error) {
        throw new Error(error.message);
      }

      const { path } = data;

      const filePath = path.split(",")[0];
      const supabaseFileUrl = urlJoin(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        "/storage/v1/object/public/public-user-assets",
        filePath,
      );

      return supabaseFileUrl;
    },
  );

import { ImageResponse } from "next/og";
import { z } from "zod";

export const runtime = "edge";

export type Props = {
  title?: string;
};

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = "";
  const bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  // convert to buffer

  const myBuffer = Buffer.from(binary, "binary");
  return myBuffer.toString("base64");
}
async function getImageSrcFromPath(url: URL) {
  const image = await fetch(url).then((res) => res.arrayBuffer());
  // get image src from arraybuffer
  // https://stackoverflow.com/a/18650249/3015595
  const base64Flag = "data:image/png;base64,";
  const imageStr = arrayBufferToBase64(image);
  return base64Flag + imageStr;
}

const paramsSchema = z.object({
  title: z.string().optional(),
});

export async function GET(
  request: Request,
  props: { params: Promise<unknown> },
): Promise<ImageResponse> {
  const params = await props.params;
  const { title } = paramsSchema.parse(params);
  if (!title) {
    throw new Error("title is required");
  }
  const [blogImageSrc] = await Promise.all([
    getImageSrcFromPath(new URL("./og-base.png", import.meta.url)),
  ]);
  const interSemiBold = fetch(
    new URL("@/fonts/inter/Inter-SemiBold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  const titleClassName = title.length > 30 ? "text-6xl" : "text-8xl";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
        }}
      >
        <div tw="relative w-full flex justify-between flex-row">
          <img src={blogImageSrc} alt="image" tw="absolute z-10" />
          <div tw="flex w-full justify-start pl-38 pt-64 text-white max-w-225">
            <p tw={`${titleClassName} leading-snug`}>{title}</p>
          </div>
        </div>
      </div>
    ),
    {
      width: 1686,
      height: 882,
      fonts: [
        {
          name: "Inter",
          data: await interSemiBold,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}

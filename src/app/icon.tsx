import { ImageResponse } from "next/og";
import { promises as fs } from "fs";
import path from "path";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

const fontPath = path.resolve(
  process.cwd(),
  "public/fonts/MontserratAlternates-SemiBold.ttf"
);

export default async function Icon() {
  const fontData = await fs.readFile(fontPath);
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 58,
          position: "absolute",
          bottom: "-0.24em",
          color: "#4fd12a",
          fontFamily: "Montserrat Alternates",
          left: "55%",
          transform: "translateX(-50%)",
        }}
      >
        a
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Montserrat Alternates",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}

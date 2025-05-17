// 例: lib/eyecatch.js

import { getPlaiceholder } from "plaiceholder";
import fs from "fs";
import path from "path";

export async function getLocalPlaiceholder(src) {
  const buffer = fs.readFileSync(path.join(process.cwd(), "public", src));

  const { base64, img } = await getPlaiceholder(buffer);

  return {
    ...img,
    blurDataURL: base64,
  };
}

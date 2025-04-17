// components/convert-body.js
import parse from "html-react-parser";
import Image from "next/image";

export default function ConvertBody({ contentHTML }) {
  const contentReact = parse(contentHTML, {
    replace: (node) => {
      if (node.name === "img") {
        const { src, alt, width, height } = node.attribs;
        return (
          <Image
            src={src}
            width={Number(width)}
            height={Number(height)}
            alt={alt}
            sizes="(min-width: 768px) 768px, 100vw"
            style={{ width: "100%", height: "auto" }} //レスポンシブ対応
          />
        );
      }
    },
  });
  return <>{contentReact}</>;
}

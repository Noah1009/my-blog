// app/blog/schedule/page.js
import { getPostBySlug } from "@/lib/api";
import { extractText } from "@/lib/extract-text";
import Meta from "@/components/meta";
import Container from "@/components/container";
import PostHeader from "@components/post-header";
import PostBody from "@components/post-body";
import ConvertBody from "@components/convert-body";
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar,
} from "@components/two-column";
import PostCategories from "@components/post-categories";
import Image from "next/image";

export default async function SchedulePage() {
  const slug = "schedule";

  const post = await getPostBySlug(slug);

  // console.log("取得したカテゴリ:", post.categories);

  const { title, publishDate, eyecatch, categories, content } = post;

  // メタディスクリプション用のテキストを抽出
  const description = extractText(content, 100, "…続きを読む");

  return (
    <>
      {/* メタ情報の挿入（OGPやdescription) */}
      <Meta
        pageTitle={title}
        pageDesc={description}
        pageImg={eyecatch?.url}
        pageImgW={eyecatch?.width}
        pageImgH={eyecatch?.height}
      />

      <Container>
        <article>
          <PostHeader
            title={title}
            subtitle="Blog Article"
            publish={publishDate}
          />
          <p style={{ margin: "0 0 1.5rem", color: "#888" }}>
            {new Date(post.publishedAt).toLocaleDateString("ja-JP")}
          </p>

          {/* アイキャッチ画像 */}
          {eyecatch?.url && (
            <figure>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16/9",
                }}
              >
                <Image src={eyecatch.url} alt={title} fill priority />
              </div>
            </figure>
          )}
          <TwoColumn>
            <TwoColumnMain>
              <PostBody>
                <ConvertBody contentHTML={content} />
              </PostBody>
            </TwoColumnMain>
            <TwoColumnSidebar>
              <PostCategories categories={categories} />
            </TwoColumnSidebar>
          </TwoColumn>
        </article>
      </Container>
    </>
  );
}

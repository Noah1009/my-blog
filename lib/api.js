// lib/api.js
import { createClient } from "microcms-js-sdk";
import { eyecatchLocal } from "@/lib/constants";

// microCMS クライアント初期化
export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN,
  apiKey: process.env.API_KEY,
  // retry: true
});

// ブラー画像生成（再利用化）
async function generateBlurData(url) {
  try {
    // 相対パスなら絶対URLに変換
    const fullUrl = url.startsWith("/")
      ? `${process.env.NEXT_PUBLIC_SITE_URL}${url}`
      : url;

    const apiUrl = `${
      process.env.NEXT_PUBLIC_SITE_URL
    }/api/blur?image=${encodeURIComponent(fullUrl)}`;
    const res = await fetch(apiUrl);

    if (!res.ok) {
      console.error(
        `blur API fetch failed (${fullUrl}): ${res.status} ${res.statusText}`
      );
      return "";
    }

    const { base64 } = await res.json();
    return base64;
  } catch (e) {
    console.error("blurDataURL 生成エラー", e);
    return "";
  }
}

const isProd = process.env.NODE_ENV === "production";

// アイキャッチ画像を正規化し、blurDataURLを生成（開発環境ではスキップ）
async function normalizeEyecatch(raw) {
  if (!raw || !raw.url || typeof raw.url !== "string") {
    console.warn("アイキャッチが不正です。default-ogpを使用します:", raw);

    console.log("NODE_ENV:", process.env.NODE_ENV, "isProd:", isProd);

    return {
      url: eyecatchLocal.url,
      width: eyecatchLocal.width,
      height: eyecatchLocal.height,
      blurDataURL: isProd ? await generateBlurData(eyecatchLocal.url) : "",
    };
  }

  return {
    ...raw,
    blurDataURL: isProd ? await generateBlurData(raw.url) : "",
  };
}

// 全記事取得（ページネーション対応）
export async function getAllPosts(maxLimit = 100) {
  const all = [];
  let page = 0;

  try {
    while (true) {
      const { contents } = await client.get({
        endpoint: "blogs",
        queries: {
          // ✅ 必要なフィールドを明示的に指定
          fields: "title,slug,eyecatch,publishDate",
          limit: maxLimit,
          offset: page * maxLimit,
        },
      });

      const enriched = await Promise.all(
        contents.map(async ({ slug, title, eyecatch, publishDate }) => ({
          slug,
          title,
          publishDate,
          eyecatch: await normalizeEyecatch(eyecatch),
        }))
      );

      all.push(...enriched);
      if (contents.length < maxLimit) break;
      page++;
    }
  } catch (err) {
    console.error("~~ getAllPosts エラー ~~", err);
  }

  return all;
}

// slug による記事取得
export async function getPostBySlug(slug) {
  try {
    const { contents } = await client.get({
      endpoint: "blogs",
      queries: {
        filters: `slug[equals]${encodeURIComponent(slug)}`,
        limit: 1,
      },
    });

    if (!contents.length) return null;

    const post = contents[0];
    return {
      ...post,
      eyecatch: await normalizeEyecatch(post.eyecatch),
    };
  } catch (err) {
    console.error("~~ getPostBySlug エラー ~~", err);
    return null;
  }
}

// slug 一覧取得
export async function getAllSlugs(limit = 100) {
  const posts = await getAllPosts(limit);
  return posts.map(({ slug }) => ({ slug }));
}

// 最新記事だけ取得（トップページ用）✅ 修正済み
export async function getLatestPosts(limit = 4) {
  try {
    const { contents } = await client.get({
      endpoint: "blogs",
      queries: {
        limit,
        orders: "-publishDate", // 最新順で取得
      },
    });

    const enriched = await Promise.all(
      contents.map(async ({ slug, title, eyecatch }) => ({
        slug,
        title,
        eyecatch: await normalizeEyecatch(eyecatch),
      }))
    );

    return enriched;
  } catch (err) {
    console.error("~~ getLatestPosts エラー ~~", err);
    return [];
  }
}

// カテゴリー覧を取得
export async function getAllCategories() {
  try {
    const { contents } = await client.get({
      endpoint: "categories",
    });
    return contents;
  } catch (err) {
    console.error("~~ getAllCategories エラー ~~", err);
    return [];
  }
}

// 特定のカテゴリのスラッグに属する記事を取得
export async function getPostsByCategorySlug(slug) {
  try {
    const { contents } = await client.get({
      endpoint: "blogs",
      queries: {
        filters: `categories[contains]${slug}`,
        fields: "title,slug,eyecatch,publishDate",
      },
    });

    // アイキャッチの正規化
    const enriched = await Promise.all(
      contents.map(async ({ slug, title, eyecatch }) => ({
        slug,
        title,
        eyecatch: await normalizeEyecatch(eyecatch),
      }))
    );

    return enriched;
  } catch (err) {
    console.error("~~ getPostsByCategorySlug エラー ~~", err);
    return [];
  }
}

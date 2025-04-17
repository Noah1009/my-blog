//lib/api.js
import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN,
  apiKey: process.env.API_KEY,
});

// slug 一覧を取得
export async function getAllSlugs() {
  const data = await client.get({ endpoint: "blogs" });
  return data.contents.map((item) => ({
    slug: item.slug,
  }));
}

// slugから1記事を取得
export async function getPostBySlug(slug) {
  try {
    const post = await client.get({
      endpoint: "blogs",
      queries: {
        filters: `slug[equals]${slug}`,
      },
    });
    return post.contents[0];
  } catch (err) {
    console.log("~~getPostBySlug ~~");
    console.error(err);
  }
}

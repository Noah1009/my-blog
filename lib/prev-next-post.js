// lib/prev-next-post.js

//前後の記事を取得する関数
export function getPrevNextPosts(allPosts, currentSlug) {
  //現在の記事のインデックスを取得
  const index = allPosts.findIndex((post) => post.slug === currentSlug);

  //エラー対策：存在しない場合は null を返す
  if (index === -1) {
    return { prevPost: null, nextPost: null };
  }

  const prevPost = index > 0 ? allPosts[index - 1] : null;
  const nextPost = index < allPosts.length - 1 ? allPosts[index + 1] : null;

  return { prevPost, nextPost };
}

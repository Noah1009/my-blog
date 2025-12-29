import type { Post } from '@/lib/types'

/**
 * 前後の記事を取得する関数
 * @param allPosts - 全記事リスト（slug順である必要あり）
 * @param currentSlug - 現在の記事のslug
 * @returns 前後の記事（なければnull）
 */
export function getPrevNextPosts(
  allPosts: Post[],
  currentSlug: string
): {
  prevPost: Post | null
  nextPost: Post | null
} {
  const index = allPosts.findIndex((post) => post.slug === currentSlug)

  if (index === -1) {
    return { prevPost: null, nextPost: null }
  }

  const prevPost = index > 0 ? allPosts[index - 1] : null
  const nextPost = index < allPosts.length - 1 ? allPosts[index + 1] : null

  return { prevPost, nextPost }
}

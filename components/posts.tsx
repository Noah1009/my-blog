// components/posts.tsx

import Image from 'next/image'
import styles from 'styles/posts.module.css'
import Link from 'next/link'
import type { FC } from 'react'
import type { Post } from '@/lib/types'

type PostsProps = {
  posts: Post[]
}

const Posts: FC<PostsProps> = ({ posts }) => {
  return (
    <ul className={styles.gridContainer}>
      {posts.map(({ slug, title, eyecatch, publishDate }) => {
        // ---------- 画像情報 ----------
        const src = eyecatch?.url ?? '/images/default-ogp.jpg'
        const width = eyecatch?.width || 1200
        const height = eyecatch?.height || 630
        const hasBlur = !!eyecatch?.blurDataURL
        const alt = eyecatch?.url
          ? `${title} のアイキャッチ画像`
          : 'デフォルトのアイキャッチ画像'
        // --------------------------------

        return (
          <li key={slug} className={styles.card}>
            <Link href={`/blog/${slug}`} className={styles.link}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/9',
                }}
              >
                <Image
                  src={src}
                  alt={alt}
                  sizes="(min-width: 1152px) 576vw, 50vw"
                  placeholder={hasBlur ? 'blur' : undefined}
                  blurDataURL={hasBlur ? eyecatch!.blurDataURL : undefined}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              {/* ✅ 投稿日時を表示 */}
              <p className={styles.date}>{publishDate}</p>
              <h2 className={styles.title}>{title}</h2>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default Posts

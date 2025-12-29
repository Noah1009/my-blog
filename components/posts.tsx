// components/posts.tsx

import Image from 'next/image'
import styles from 'styles/posts.module.css'
import Link from 'next/link'
import type { FC } from 'react'
import type { Post } from '@/lib/types'

type PostsProps = {
  posts: Post[]
  basePath?: string // ★追加：リンク先の基点
}

const Posts: FC<PostsProps> = ({ posts, basePath = '/blog' }) => {
  return (
    <ul className={styles.gridContainer}>
      {posts.map(({ slug, title, eyecatch, publishDate }) => {
        const src = eyecatch?.url ?? '/images/default-ogp.jpg'
        const hasBlur = !!eyecatch?.blurDataURL
        const alt = eyecatch?.url
          ? `${title} のアイキャッチ画像`
          : 'デフォルトのアイキャッチ画像'

        return (
          <li key={slug} className={styles.card}>
            {/* ★変更：/blog 固定をやめる */}
            <Link href={`${basePath}/${slug}`} className={styles.link}>
              <div className={styles.imageWrapper}>
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  placeholder={hasBlur ? 'blur' : undefined}
                  blurDataURL={hasBlur ? eyecatch!.blurDataURL : undefined}
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div className={styles.content}>
                <p className={styles.date}>{publishDate}</p>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.readMore}>
                  Read More <span>→</span>
                </div>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default Posts

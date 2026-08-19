from pathlib import Path
from datetime import datetime
import shutil

ROOT = Path.home() / "sake"

FILES = {
    "layout": ROOT / "app/layout.tsx",
    "home": ROOT / "app/page.tsx",
    "note": ROOT / "app/notes/[slug]/page.tsx",
    "not_found": ROOT / "app/not-found.tsx",
    "meta": ROOT / "components/meta.tsx",
}

timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
backup_root = Path.home() / "sake_backups"
backup_root.mkdir(parents=True, exist_ok=True)
backup_dir = backup_root / f"_backup_metadata_{timestamp}"

print(f"バックアップ先: {backup_dir}")

# ============================================================
# 1. バックアップ
# ============================================================

for name, path in FILES.items():
    if path.exists():
        relative = path.relative_to(ROOT)
        backup_path = backup_dir / relative
        backup_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(path, backup_path)
        print(f"[BACKUP] {relative}")

# ============================================================
# 2. app/layout.tsx
# ============================================================

path = FILES["layout"]
text = path.read_text(encoding="utf-8")

old_metadata = """export const metadata: Metadata = {
  title: siteMeta.siteTitle,
  description: siteMeta.siteDesc,
  openGraph: {
    title: siteMeta.siteTitle,
    description: siteMeta.siteDesc,
    url: siteMeta.siteUrl,
    siteName: siteMeta.siteTitle,
    images: [
      {
        url: `${siteMeta.siteUrl}/images/default-ogp.jpg`,
        width: 1200,
        height: 630,
      },
    ],
  },
}
"""

new_metadata = """export const metadata: Metadata = {
  // Metadata APIの相対URL解決用
  metadataBase: new URL(siteMeta.siteUrl),

  title: siteMeta.siteTitle,
  description: siteMeta.siteDesc,

  // canonical URL
  alternates: {
    canonical: '/',
  },

  // favicon / Apple Touch Icon
  icons: {
    icon: siteMeta.siteIcon,
    apple: siteMeta.siteIcon,
  },

  openGraph: {
    title: siteMeta.siteTitle,
    description: siteMeta.siteDesc,
    url: '/',
    siteName: siteMeta.siteTitle,
    locale: siteMeta.siteLocale,
    type: 'website',
    images: [
      {
        url: '/images/default-ogp.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
}
"""

if old_metadata in text:
    text = text.replace(old_metadata, new_metadata)
    path.write_text(text, encoding="utf-8")
    print("[OK] app/layout.tsx を更新")
else:
    print("[SKIP] app/layout.tsx: 想定したmetadataブロックが見つかりません")

# ============================================================
# 3. app/page.tsx
# ============================================================

path = FILES["home"]
text = path.read_text(encoding="utf-8")

# next/headを使うMetaコンポーネントのimportを削除
text = text.replace("import Meta from '@/components/meta'\n", "")

old_meta_block = """      <Meta
        pageTitle={siteMeta.siteTitle}
        pageDesc={siteMeta.siteDesc}
        pageUrl={`${siteMeta.siteUrl}/`}
        pageImg="/images/default-ogp.jpg"
      />

"""

if old_meta_block in text:
    text = text.replace(old_meta_block, "")
    print("[OK] app/page.tsx の <Meta> を削除")
else:
    print("[INFO] app/page.tsx の <Meta> ブロックは見つかりませんでした")

path.write_text(text, encoding="utf-8")

# ============================================================
# 4. app/notes/[slug]/page.tsx
# ============================================================

path = FILES["note"]
text = path.read_text(encoding="utf-8")

# Meta import削除
text = text.replace("import Meta from '@/components/meta'\n", "")

# Metadata型import追加
if "import type { Metadata } from 'next'\n" not in text:
    text = text.replace(
        "import { notFound } from 'next/navigation'\n",
        "import type { Metadata } from 'next'\n"
        "import { notFound } from 'next/navigation'\n",
    )

page_props = """type PageProps = {
  params: Promise<{
    slug: string
  }>
}
"""

generate_metadata = """
// ============================================================
// 動的ページ用Metadata
// ============================================================
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params

  const note: Post | null = await getNoteBySlug(slug)

  if (!note) {
    return {
      title: '記事が見つかりません',
    }
  }

  const title = `${note.title} | ${siteMeta.siteTitle}`
  const url = `${siteMeta.siteUrl}/notes/${note.slug}`

  return {
    title,
    description: note.title,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description: note.title,
      url,
      siteName: siteMeta.siteTitle,
      locale: siteMeta.siteLocale,
      type: 'article',

      images: note.eyecatch?.url
        ? [
            {
              url: note.eyecatch.url,
              width: note.eyecatch.width,
              height: note.eyecatch.height,
            },
          ]
        : [
            {
              url: `${siteMeta.siteUrl}/images/default-ogp.jpg`,
              width: 1200,
              height: 630,
            },
          ],
    },
  }
}
"""

if "export async function generateMetadata" not in text:
    if page_props in text:
        text = text.replace(
            page_props,
            page_props + generate_metadata,
        )
        print("[OK] notes/[slug] に generateMetadata() を追加")
    else:
        print("[ERROR] PageProps が見つかりません")
else:
    print("[INFO] generateMetadata() はすでに存在します")

old_meta_block = """      <Meta
        pageTitle={note.title}
        pageDesc={note.title}
        pageUrl={`${siteMeta.siteUrl}/notes/${note.slug}`}
        pageImg={note.eyecatch?.url}
        pageImgW={note.eyecatch?.width}
        pageImgH={note.eyecatch?.height}
      />

"""

if old_meta_block in text:
    text = text.replace(old_meta_block, "")
    print("[OK] notes/[slug] の <Meta> を削除")

path.write_text(text, encoding="utf-8")

# ============================================================
# 5. app/not-found.tsx
# ============================================================

path = FILES["not_found"]
text = path.read_text(encoding="utf-8")

text = text.replace('import Meta from "@/components/meta";\n', "")
text = text.replace('      <Meta pageTitle="404 - Page not found" />\n\n', "")

path.write_text(text, encoding="utf-8")
print("[OK] app/not-found.tsx の Meta を削除")

# ============================================================
# 6. components/meta.tsx はまだ削除しない
# ============================================================

print()
print("======================================")
print("Metadata API 移行処理 完了")
print("======================================")
print()
print("まだ components/meta.tsx は削除していません。")
print("次に grep と npm run build で確認してください。")

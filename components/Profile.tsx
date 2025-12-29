// components/profile.tsx
'use client'

import styles from '@/styles/profile.module.css'
import ProfileCircle from '@/components/ProfileCircle'

export default function ProfileCard() {
  return (
    <>
      <div className={styles.profileRow}>
        <p className={styles.bio}>
          趣味で日本酒の記録をつけています。<br />
          純米酒が好きでこれまで飲んだお酒や、<br />
          飲みたいお酒などについて<br />
          私がメモしたいことを記録しています。
        </p>
        <div className={styles.avatarCircle}>
          <ProfileCircle imageSrc="/profile.png" text="Noritaka Urasaki" />
        </div>
      </div>
    </>
  )
}


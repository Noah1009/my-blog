// components/ProfileCircle.tsx
'use client'

import React from 'react'
import styles from '@/styles/ProfileCircle.module.css'

type Props = {
  imageSrc: string
  text: string
}

const ProfileCircle: React.FC<Props> = ({ imageSrc, text }) => {
  return (
    <div className={styles.profileCircleWrapper}>
      <img src={imageSrc} alt="Profile" className={styles.profileImage} />
      <svg className={styles.textCircle} viewBox="0 0 200 200">
        <defs>
          <path
            id="circlePath"
            d="M100,100 m-90,0 a90,90 0 1,1 180,0 a90,90 0 1,1 -180,0"
          />
        </defs>
        <text>
          <textPath
            href="#circlePath"
            textLength="565"        // 目安: 円周に近い長さ (2πr ≈ 565px for r=90)
            lengthAdjust="spacing"
            startOffset="0%"
          >
            {`${text} — `.repeat(2).trim()}
          </textPath>
        </text>
      </svg>
    </div>
  )
}

export default ProfileCircle



// components/hero.js
import styles from "styles/hero.module.css";
import Image from "next/image";
import cube from "public/images/cube.jpg";

export default function Hero({ title, subtitle, imageOn = false }) {
  return (
    <div className={styles.flexContainer}>
      <div className={styles.text}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      {imageOn && (
        <figure className={styles.image}>
          <Image
            src={cube}
            alt="CUBEのイメージ画像"
            placeholder="blur"
            width={576}
            height={324}
            sizes="(min-width: 1152px) 576px, (min-width: 768px) 50vw, 100vw"
            priority
          />
        </figure>
      )}
    </div>
  );
}

// components/social.js
import Image from "next/image";
import styles from "styles/social.module.css";

export default function Social({ iconSize = "initial" }) {
  return (
    <ul className={styles.list} /*style={{ "--icon-size": iconSize }}*/>
      <li>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/social/Facebook_Logo_Primary.png"
            alt="Facebook"
            width={40}
            height={40}
            className={styles.icon}
          />
          {/* <span className="sr-only">Facebook</span> */}
        </a>
      </li>
      <li>
        <a
          href="https://Instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/social/Instagram_Glyph_Gradient.png"
            alt="Instagram"
            width={40}
            height={40}
            className={styles.icon}
          />
          {/* <span className="sr-only">Instagram</span> */}
        </a>
      </li>
      <li>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <Image
            src="/social/youtube_social_icon_red.png"
            alt="YouTube"
            width={40}
            height={40}
            className={styles.icon}
          />
          {/* <span className="sr-only">YouTube</span> */}
        </a>
      </li>
      <li>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <Image
            src="/social/github-mark.png"
            alt="GitHub"
            width={24}
            height={24}
            className={styles.icon}
          />
          {/* <span className="sr-only">GitHub</span> */}
        </a>
      </li>
    </ul>
  );
}

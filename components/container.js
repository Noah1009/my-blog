// components/container.js
import styles from "styles/container.module.css";

export default function Container({ children, large = false }) {
  return (
    // composesでmargin: 0 auto;が継承されないためコードを修正
    // <div className={large ? styles.large : styles.default}>{children}</div>
    //  default のスタイルは常に適用し、large が true の場合は large クラスも追加
    <div className={`${styles.default} ${large ? styles.large : ""}`}>
      {children}
    </div>
  );
}

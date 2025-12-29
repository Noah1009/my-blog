// app/contact/page.tsx
import type { JSX } from 'react';
import Double from '@/components/Double';
import styles from '@/styles/contact.module.css';

export default function ContactPage(): JSX.Element {
  return (
    <div className={styles.container}>
      <Double>
        <h1>Contact</h1>
        <p>以下のフォームからお問い合わせください。</p>
        <form className={styles.form}>
          <div>
            <label htmlFor="name">お名前：</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div>
            <label htmlFor="email">メールアドレス：</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="message">メッセージ：</label>
            <textarea id="message" name="message" required />
          </div>
          <button type="submit">送信</button>
        </form>
      </Double>
    </div>
  );
}

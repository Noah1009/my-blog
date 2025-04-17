<<<<<<< HEAD
=======
// app/layout.js (ルートレイアウト)
// export default function RootLayout({ children }) {
//   return (
//     <html lang="ja">
//       <body>{children}</body>
//     </html>
//   );
// }

// app/layout.js

import "styles/global.css";
import "styles/layout.module.css";
import Header from "@components/header";
import Footer from "@components/footer";
import Meta from "@components/meta";
// Font Awesomeの設定
// import "@fortawesome/fontawesome-svg-core/styles.css";
// import { config } from "@fortawesome/fontawesome-svg-core";
// config.autoAddCss = false;
// import { IconHome } from "@components/icon";

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <Meta />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        {/* <IconHome /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
>>>>>>> 6c50c2a (first commit)

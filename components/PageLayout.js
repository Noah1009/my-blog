// components/PageLayout.js
import Header from "components/header";
import Footer from "components/footer";

export default function PageLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

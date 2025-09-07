import Footer from "../Footer/Footer";
import Header from "../Header/Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative flex min-h-screen flex-col bg-white dark:bg-dark-900">
      <Header />
      <main className="flex-1 flex mb-12 flex-col">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

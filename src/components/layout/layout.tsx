import Footer from './footer';
import Nav from './nav';
import styles from './layout.module.css';

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <div className={styles.layout}>
        <Nav />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;

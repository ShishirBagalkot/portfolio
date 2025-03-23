import styles from "./FooterStyles.module.css";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <section id="footer" className={styles.container}>
      <p>
        &copy; {currentYear} Shishir Bagalkot
        <br />
        All content is created with love, caffeine, and possibly a dash of procrastination.
      </p>
    </section>
  );
}

export default Footer;
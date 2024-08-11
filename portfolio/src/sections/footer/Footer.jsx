import styles from "./FooterStyles.module.css";

function Footer() {
  return (
    <section id="footer" className={styles.container}>
      <p>
        &copy; 2024 Shishir Bagalkot
        <br />
        All content is created with love, caffeine, and possibly a dash of procrastination.
      </p>
    </section>
  );
}

export default Footer;
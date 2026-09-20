import { motion } from "framer-motion";
import styles from "./FooterStyles.module.css";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.section
      id="footer"
      className={styles.container}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6 }}
    >
      <span className={styles.glyphRule} aria-hidden="true">/ / /</span>
      <p>
        &copy; {currentYear} Shishir Bagalkot
        <br />
        All content is created with love, caffeine, and possibly a dash of procrastination.
      </p>
    </motion.section>
  );
}

export default Footer;

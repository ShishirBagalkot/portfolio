import { motion } from "framer-motion";
import styles from "./AboutStyles.module.css";

const STATS = [
  { value: "2.5+", label: "Years Experience", glyph: "01" },
  { value: "REST", label: "APIs Designed", glyph: "{}" },
  { value: "TDD", label: "JUnit / Mockito", glyph: "<>" },
  { value: "Agile", label: "Scrum Delivery", glyph: "//" },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const About = () => {
  return (
    <section id="about" className={styles.container}>
      <motion.h1
        className="sectionTitle"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6 }}
      >
        About
      </motion.h1>
      <motion.p
        className={styles.description}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Full Stack Developer with 2.5+ years of experience in designing REST
        APIs using Java, Spring Boot, Kafka, Cassandra, PostgreSQL, and
        Angular. Proficient in TDD (JUnit), secure coding (SonarQube,
        Veracode), and Agile (Scrum). Experienced with DevOps tools like
        Jenkins and Spinnaker. Strong communicator with excellent time
        management and problem-solving skills.
      </motion.p>
      <motion.div
        className={styles.statGrid}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {STATS.map(({ value, label, glyph }) => (
          <motion.div className={styles.statCard} variants={item} key={label}>
            <span className={styles.statGlyph} aria-hidden="true">{glyph}</span>
            <strong>{value}</strong>
            <span>{label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default About

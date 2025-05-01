import styles from './AboutStyles.module.css';

export const About = () => {
  return (
    <section id="about" className={styles.container}>
        <h1 className="sectionTitle">About</h1>
        <p className={styles.description}>
        Full Stack Developer with 2.5+ years of experience in designing REST APIs using Java, Spring Boot, Kafka, Cassandra, PostgreSQL, and Angular. Proficient in TDD (JUnit), secure coding (SonarQube, Veracode), and Agile (Scrum). Experienced with DevOps tools like Jenkins and Spinnaker. Strong communicator with excellent time management and problem-solving skills.
        </p>
    </section>
  )
}

export default About
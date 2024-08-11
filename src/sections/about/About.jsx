import styles from './AboutStyles.module.css';

function About() {
  return (
    <section id="about" className={styles.container}>
        <h1 className="sectionTitle">About</h1>
        <p className={styles.description}>
            Full Stack Developer with 2 years of experience in REST APIs, Java, Spring Boot, Cassandra, and PostgreSQL. Skilled in Angular, HTML, CSS, TDD (Junit), and secure coding with SonarQube. Proficient in Agile (Scrum) and DevOps tools (Jenkins, Spinnaker). Strong communicator with excellent time management and problem-solving abilities.
        </p>
    </section>
  )
}

export default About
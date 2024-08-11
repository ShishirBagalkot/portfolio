import styles from "./SkillsStyles.module.css";
import checkMarkIcon from "../../assets/checkmark-dark.svg";
import SkillsList from "../../common/SkillsList";

function Skills() {
  return (
    <section id="skills" className={styles.container}>
      <h1 className="sectionTitle">Skills</h1>
      <div className={styles.skillsList}>
        <SkillsList logoSrc={checkMarkIcon} skillName="Java" />
        <SkillsList logoSrc={checkMarkIcon} skillName="SpringBoot" />
        <SkillsList logoSrc={checkMarkIcon} skillName="JUnit/Mockito" />
        <SkillsList logoSrc={checkMarkIcon} skillName="Angular" />
        <SkillsList logoSrc={checkMarkIcon} skillName="HTML" />
        <SkillsList logoSrc={checkMarkIcon} skillName="CSS/SCSS" />
        <SkillsList logoSrc={checkMarkIcon} skillName="Jasmine" />
      </div>
      <hr />
      <div className={styles.skillsList}>
        <SkillsList logoSrc={checkMarkIcon} skillName="Cassandra" />
        <SkillsList logoSrc={checkMarkIcon} skillName="PostgreSQL" />
      </div>
      <hr />
      <div className={styles.skillsList}>
        <SkillsList logoSrc={checkMarkIcon} skillName="AWS" />
        <SkillsList logoSrc={checkMarkIcon} skillName="BitBucket" />
        <SkillsList logoSrc={checkMarkIcon} skillName="GitHub" />
      </div>
      <hr />
      <div className={styles.skillsList}>
        <SkillsList logoSrc={checkMarkIcon} skillName="Jenkins" />
        <SkillsList logoSrc={checkMarkIcon} skillName="Spinnaker" />
        <SkillsList logoSrc={checkMarkIcon} skillName="Jira" />
        <SkillsList logoSrc={checkMarkIcon} skillName="Confluence" />
      </div>
    </section>
  );
}

export default Skills;
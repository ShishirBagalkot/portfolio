import styles from "./SkillsStyles.module.css";
import darkThemeCheckMarkIcon from "../../assets/checkmark-dark.svg";
import lightThemeCheckMarkIcon from "../../assets/checkmark-light.svg";
import javaIcon from "../../assets/java.svg";
import sprintBootIcon from "../../assets/springboot.svg";
import angularIcon from "../../assets/angular.svg";
import htmlIcon from "../../assets/html.svg";
import cssIcon from "../../assets/css.svg";
import cassandraIcon from "../../assets/cassandra.svg";
import postGreSqlIcon from "../../assets/postgresql.svg";
import awsIcon from "../../assets/aws.svg";
import bitBucketIcon from "../../assets/bitbucket.svg";
import gitHubIcon from "../../assets/github.svg";
import jenkinsIcon from "../../assets/jenkins.svg";
import spinnakerIcon from "../../assets/spinnaker.svg";
import jiraIcon from "../../assets/jira.svg";
import confluenceIcon from "../../assets/confluence.svg";
import SkillsList from "../../common/SkillsList";
import { useTheme } from "../../common/ThemeContext";

function Skills() {
  const {theme} = useTheme();
  const checkMarkIcon = theme === 'light' ? lightThemeCheckMarkIcon: darkThemeCheckMarkIcon;

  return (
    <section id="skills" className={styles.container}>
      <h1 className="sectionTitle">Skills</h1>
      <div className={styles.skillsList}>
        <SkillsList logoSrc={javaIcon} skillName="Java" />
        <SkillsList logoSrc={sprintBootIcon} skillName="SpringBoot" />
        <SkillsList logoSrc={checkMarkIcon} skillName="JUnit/Mockito" />
        <SkillsList logoSrc={angularIcon} skillName="Angular" />
        <SkillsList logoSrc={htmlIcon} skillName="HTML" />
        <SkillsList logoSrc={cssIcon} skillName="CSS/SCSS" />
        <SkillsList logoSrc={checkMarkIcon} skillName="Jasmine" />
      </div>
      <hr />
      <div className={styles.skillsList}>
        <SkillsList logoSrc={cassandraIcon} skillName="Cassandra" />
        <SkillsList logoSrc={postGreSqlIcon} skillName="PostgreSQL" />
      </div>
      <hr />
      <div className={styles.skillsList}>
        <SkillsList logoSrc={awsIcon} skillName="AWS" />
        <SkillsList logoSrc={bitBucketIcon} skillName="BitBucket" />
        <SkillsList logoSrc={gitHubIcon} skillName="GitHub" />
      </div>
      <hr />
      <div className={styles.skillsList}>
        <SkillsList logoSrc={jenkinsIcon} skillName="Jenkins" />
        <SkillsList logoSrc={spinnakerIcon} skillName="Spinnaker" />
        <SkillsList logoSrc={jiraIcon} skillName="Jira" />
        <SkillsList logoSrc={confluenceIcon} skillName="Confluence" />
      </div>
    </section>
  );
}

export default Skills;
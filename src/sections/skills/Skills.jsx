import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
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
import lightGitHubSkillIcon from "../../assets/github-light.svg";
import darkGitHubSkillIcon from "../../assets/github-dark.svg";
import jenkinsIcon from "../../assets/jenkins.svg";
import spinnakerIcon from "../../assets/spinnaker.svg";
import jiraIcon from "../../assets/jira.svg";
import confluenceIcon from "../../assets/confluence.svg";
import SkillsList from "../../common/SkillsList";
import { useTheme } from "../../common/ThemeContext";

const cardContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const chipContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const chipVariant = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export const Skills = () => {
  const { theme } = useTheme();
  const checkMarkIcon = theme === "light" ? lightThemeCheckMarkIcon : darkThemeCheckMarkIcon;
  const gitHubSkillIcon = theme === "light" ? lightGitHubSkillIcon : darkGitHubSkillIcon;
  const reduceMotion = useReducedMotion();

  const ORBIT_CORE = [
    { icon: javaIcon, name: "Java" },
    { icon: sprintBootIcon, name: "Spring Boot" },
    { icon: angularIcon, name: "Angular" },
    { icon: postGreSqlIcon, name: "PostgreSQL" },
    { icon: cassandraIcon, name: "Cassandra" },
    { icon: awsIcon, name: "AWS" },
    { icon: gitHubSkillIcon, name: "GitHub" },
    { icon: jenkinsIcon, name: "Jenkins" },
  ];

  const CATEGORIES = [
    {
      path: "~/stack",
      skills: [
        { icon: javaIcon, name: "Java" },
        { icon: sprintBootIcon, name: "SpringBoot" },
        { icon: checkMarkIcon, name: "JUnit/Mockito" },
        { icon: angularIcon, name: "Angular" },
        { icon: htmlIcon, name: "HTML" },
        { icon: cssIcon, name: "CSS/SCSS" },
        { icon: checkMarkIcon, name: "Jasmine" },
      ],
    },
    {
      path: "~/data",
      skills: [
        { icon: cassandraIcon, name: "Cassandra" },
        { icon: postGreSqlIcon, name: "PostgreSQL" },
      ],
    },
    {
      path: "~/cloud",
      skills: [
        { icon: awsIcon, name: "AWS" },
        { icon: bitBucketIcon, name: "BitBucket" },
        { icon: gitHubSkillIcon, name: "GitHub" },
      ],
    },
    {
      path: "~/ops",
      skills: [
        { icon: jenkinsIcon, name: "Jenkins" },
        { icon: spinnakerIcon, name: "Spinnaker" },
        { icon: jiraIcon, name: "Jira" },
        { icon: confluenceIcon, name: "Confluence" },
      ],
    },
  ];

  const sceneRef = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { damping: 20, stiffness: 120 });
  const rotateY = useSpring(ry, { damping: 20, stiffness: 120 });

  const angleStep = 360 / ORBIT_CORE.length;

  const handleSceneMove = (e) => {
    if (reduceMotion) return;
    const el = sceneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 24);
    rx.set(-py * 24);
  };

  const handleSceneLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <section id="skills" className={styles.container}>
      <h1 className="sectionTitle">Skills</h1>

      <div
        className={styles.scene}
        ref={sceneRef}
        onPointerMove={handleSceneMove}
        onPointerLeave={handleSceneLeave}
      >
        <motion.div className={styles.orbitWrapper} style={{ rotateX, rotateY }}>
          <div className={`${styles.orbit} ${reduceMotion ? styles.orbitStatic : ""}`}>
            {ORBIT_CORE.map(({ icon, name }, i) => (
              <div
                key={name}
                className={styles.orbitItem}
                style={{
                  transform: `translate(-50%, -50%) rotateY(${i * angleStep}deg) translateZ(var(--orbit-radius))`,
                }}
              >
                <img src={icon} alt={name} title={name} />
              </div>
            ))}
          </div>
          <div className={styles.core}>
            <span>&lt;/&gt;</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className={styles.categoryGrid}
        variants={cardContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {CATEGORIES.map(({ path, skills }) => (
          <motion.div className={styles.categoryCard} variants={cardVariant} key={path}>
            <div className={styles.categoryHeader}>
              <span className={styles.dots} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className={styles.path}>{path}</span>
            </div>
            <motion.div
              className={styles.chipGrid}
              variants={chipContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              {skills.map(({ icon, name }) => (
                <motion.div className={styles.chip} variants={chipVariant} key={name}>
                  <SkillsList logoSrc={icon} skillName={name} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Skills;

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import styles from "./SkillsStyles.module.css";
import darkThemeCheckMarkIcon from "../../assets/checkmark-dark.svg";
import lightThemeCheckMarkIcon from "../../assets/checkmark-light.svg";
import javaIcon from "../../assets/java.svg";
import pythonIcon from "../../assets/python.svg";
import typescriptIcon from "../../assets/typescript.svg";
import sqlIcon from "../../assets/sql.svg";
import htmlIcon from "../../assets/html.svg";
import cssIcon from "../../assets/css.svg";
import gcpIcon from "../../assets/gcp.svg";
import dataflowIcon from "../../assets/dataflow.svg";
import dagsIcon from "../../assets/dags.svg";
import searchCommerceIcon from "../../assets/search-commerce.svg";
import awsEcsIcon from "../../assets/aws-ecs.svg";
import awsEc2Icon from "../../assets/aws-ec2.svg";
import awsLambdaIcon from "../../assets/aws-lambda.svg";
import ssmParameterStoreIcon from "../../assets/ssm-parameter-store.svg";
import awsSecretsManagerIcon from "../../assets/aws-secrets-manager.svg";
import awsSqsIcon from "../../assets/aws-sqs.svg";
import kubernetesIcon from "../../assets/kubernetes.svg";
import dockerIcon from "../../assets/docker.svg";
import spinnakerIcon from "../../assets/spinnaker.svg";
import kafkaIcon from "../../assets/kafka.svg";
import redisIcon from "../../assets/redis.svg";
import springWebfluxIcon from "../../assets/spring-webflux.svg";
import projectReactorIcon from "../../assets/project-reactor.svg";
import sprintBootIcon from "../../assets/springboot.svg";
import angularIcon from "../../assets/angular.svg";
import openApiIcon from "../../assets/openapi.svg";
import microservicesIcon from "../../assets/microservices.svg";
import awsIcon from "../../assets/aws.svg";
import jenkinsIcon from "../../assets/jenkins.svg";
import bitBucketIcon from "../../assets/bitbucket.svg";
import lightGitHubSkillIcon from "../../assets/github-light.svg";
import darkGitHubSkillIcon from "../../assets/github-dark.svg";
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
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
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
    { icon: pythonIcon, name: "Python" },
    { icon: sprintBootIcon, name: "Spring Boot" },
    { icon: angularIcon, name: "Angular" },
    { icon: kubernetesIcon, name: "Kubernetes" },
    { icon: dockerIcon, name: "Docker" },
    { icon: gcpIcon, name: "GCP" },
    { icon: awsIcon, name: "AWS" },
  ];

  const CATEGORIES = [
    {
      path: "~/dev",
      skills: [
        { icon: javaIcon, name: "Java" },
        { icon: pythonIcon, name: "Python" },
        { icon: typescriptIcon, name: "TypeScript" },
        { icon: sqlIcon, name: "SQL" },
        { icon: htmlIcon, name: "HTML" },
        { icon: cssIcon, name: "CSS" },
      ],
    },
    {
      path: "~/cloud",
      skills: [
        { icon: gcpIcon, name: "GCP" },
        { icon: dataflowIcon, name: "Dataflow" },
        { icon: dagsIcon, name: "DAGs" },
        { icon: searchCommerceIcon, name: "Search for Commerce", title: "Search for Commerce (AI Commerce Search)" },
        { icon: awsEcsIcon, name: "AWS ECS" },
        { icon: awsEc2Icon, name: "EC2" },
        { icon: awsLambdaIcon, name: "Lambda" },
        { icon: ssmParameterStoreIcon, name: "SSM Parameter Store" },
        { icon: awsSecretsManagerIcon, name: "Secrets Manager" },
        { icon: awsSqsIcon, name: "SQS" },
        { icon: kubernetesIcon, name: "Kubernetes" },
        { icon: dockerIcon, name: "Docker" },
        { icon: spinnakerIcon, name: "Spinnaker" },
        { icon: kafkaIcon, name: "Kafka" },
        { icon: redisIcon, name: "Redis" },
      ],
    },
    {
      path: "~/frameworks",
      skills: [
        { icon: springWebfluxIcon, name: "Spring WebFlux" },
        { icon: projectReactorIcon, name: "Project Reactor", title: "Project Reactor (Mono/Flux)" },
        { icon: sprintBootIcon, name: "Spring Boot" },
        { icon: angularIcon, name: "Angular" },
        { icon: openApiIcon, name: "REST API Design" },
        { icon: microservicesIcon, name: "Microservices" },
        { icon: checkMarkIcon, name: "TDD" },
      ],
    },
    {
      path: "~/delivery",
      skills: [
        { icon: jenkinsIcon, name: "Jenkins" },
        { icon: gitHubSkillIcon, name: "GitHub" },
        { icon: bitBucketIcon, name: "Bitbucket" },
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
      <h1 className={`sectionTitle ${styles.heading}`}>Skills</h1>

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
        viewport={{ once: true, amount: 0.1 }}
      >
        {CATEGORIES.map(({ path, skills }) => (
          <motion.div
            className={`${styles.categoryCard} ${skills.length > 9 ? styles.wide : ""}`}
            variants={cardVariant}
            key={path}
          >
            <div className={styles.categoryHeader}>
              <span className={styles.dots} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className={styles.path}>{path}</span>
              <span className={styles.count}>{skills.length}</span>
            </div>
            <motion.div
              className={styles.chipGrid}
              variants={chipContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              {skills.map(({ icon, name, title }) => (
                <motion.div className={styles.chip} variants={chipVariant} key={name} title={title || name}>
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

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
import jenkinsIcon from "../../assets/jenkins.svg";
import bitBucketIcon from "../../assets/bitbucket.svg";
import lightGitHubSkillIcon from "../../assets/github-light.svg";
import darkGitHubSkillIcon from "../../assets/github-dark.svg";
import jiraIcon from "../../assets/jira.svg";
import confluenceIcon from "../../assets/confluence.svg";
import SkillsList from "../../common/SkillsList";
import { useTheme } from "../../common/ThemeContext";

const panelVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
};
const chipContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03 } },
};
const chipVariant = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
};

export const Skills = () => {
  const { theme } = useTheme();
  const checkMarkIcon = theme === "light" ? lightThemeCheckMarkIcon : darkThemeCheckMarkIcon;
  const gitHubSkillIcon = theme === "light" ? lightGitHubSkillIcon : darkGitHubSkillIcon;

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

  const [activeTab, setActiveTab] = useState(CATEGORIES[0].path);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== "/") return;
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      e.preventDefault();
      inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  const visibleSkills = useMemo(() => {
    if (isSearching) {
      return CATEGORIES.flatMap(({ path, skills }) =>
        skills
          .filter(({ name }) => name.toLowerCase().includes(normalizedQuery))
          .map((skill) => ({ ...skill, category: path }))
      );
    }
    return CATEGORIES.find(({ path }) => path === activeTab)?.skills ?? [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, isSearching, normalizedQuery, theme]);

  const panelKey = isSearching ? `search:${normalizedQuery}` : activeTab;

  return (
    <section id="skills" className={styles.container}>
      <h1 className={`sectionTitle ${styles.heading}`}>Skills</h1>

      <div className={styles.terminal}>
        <div className={styles.titleBar}>
          <span className={styles.dots} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <div className={styles.tabs} role="tablist" aria-label="Skill categories">
            {CATEGORIES.map(({ path }) => (
              <button
                key={path}
                type="button"
                role="tab"
                aria-selected={!isSearching && activeTab === path}
                className={`${styles.tab} ${!isSearching && activeTab === path ? styles.tabActive : ""}`}
                onClick={() => {
                  setActiveTab(path);
                  setQuery("");
                }}
                data-cursor-hover
              >
                {path}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.searchRow}>
          <span className={styles.prompt} aria-hidden="true">
            $ grep -i
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search skills…"
            aria-label="Search skills"
            className={styles.searchInput}
          />
          <span className={styles.hint} aria-hidden="true">
            {query ? `${visibleSkills.length} match${visibleSkills.length === 1 ? "" : "es"}` : "press /"}
          </span>
        </div>

        <div className={styles.panelViewport}>
          <AnimatePresence mode="wait">
            <motion.div
              key={panelKey}
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              role="tabpanel"
            >
              {visibleSkills.length === 0 ? (
                <p className={styles.empty}>
                  grep: no matches for &ldquo;{query}&rdquo;
                </p>
              ) : (
                <motion.div
                  className={styles.chipGrid}
                  variants={chipContainer}
                  initial="hidden"
                  animate="show"
                >
                  {visibleSkills.map(({ icon, name, title, category }) => (
                    <motion.div
                      className={styles.chip}
                      variants={chipVariant}
                      key={`${category || activeTab}-${name}`}
                      title={title || name}
                    >
                      <SkillsList logoSrc={icon} skillName={name} />
                      {isSearching && <span className={styles.chipTag}>{category}</span>}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Skills;

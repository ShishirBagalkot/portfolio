import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import styles from "./ExperienceStyles.module.css";

const STATS = [
  { value: "100K+", label: "Users protected", glyph: "01" },
  { value: "90%", label: "Security risk cut", glyph: "{}" },
  { value: "26→8GB", label: "Cache footprint", glyph: "<>" },
  { value: "40→85%", label: "Test coverage", glyph: "//" },
];

const EXPERIENCE = [
  {
    company: "Albertsons",
    slug: "albertsons",
    location: "Bengaluru",
    roles: [
      {
        title: "Software Engineer",
        period: "Dec 2025 – Present",
        current: true,
        bullets: [
          {
            text: "Zero State Search – designed and built a high-intent personalization “zero-state” launchpad, surfacing Buy It Again, Recently Viewed, Trending, and Weekly Top Hits recommendations before the shopper types a query",
            sub: [
              "Built using Java 17 and Spring WebFlux with a parallel fan-out architecture and graceful per-session degradation",
              "Architected a Redis read-through caching strategy with cache stampede protection, near-cache, and per-source circuit breakers; delivered a capacity and cost model recommending a DAU-only approach that cut the cache footprint from 26GB to 8GB with negligible user impact",
              "Built for extensibility and operability with config-driven section ordering requiring zero changes to core logic, plus end-to-end correlation ID logging and distributed tracing for full request traceability",
            ],
          },
          {
            text: "Integrated a new Elasticsearch-based deals search engine into the shopping workflow using WebFlux and Project Reactor, phasing out Google Retail Search usage for that flow.",
          },
          {
            text: "Improved product relevancy for users by integrating Customer 360 (C360) data into recommendation and personalization flows.",
          },
        ],
        stack: ["Java 17", "Spring WebFlux", "Project Reactor", "Redis", "Elasticsearch"],
      },
    ],
  },
  {
    company: "Clarivate",
    slug: "clarivate",
    location: "Bengaluru",
    roles: [
      {
        title: "Senior Software Engineer",
        period: "Nov 2024 – Nov 2025",
        bullets: [
          {
            text: "Proactively identified and resolved a critical security flaw where sessions remained active after password changes by implementing a Kafka-based real-time session invalidation system, protecting 100K+ active users across multiple products and reducing security risks by 90%",
          },
          {
            text: "Key role in development of a company-wide Secondary Entitlement Service, supporting dynamic entitlement creation for 10+ product teams. Integrated with Kafka for seamless consumption of legacy service events.",
          },
          {
            text: "Improved application security and compliance by integrating AWS SSM Parameter Store using the AWS SDK for 5+ microservices, enabling secure and scalable access to sensitive configurations.",
          },
          {
            text: "Implemented comprehensive unit tests with JUnit and end-to-end integration tests using Testcontainers from scratch, boosting test coverage from 40% to 85% and preventing regressions in existing flows.",
          },
          {
            text: "Actively participated in peer code reviews and retrospectives to enhance code quality and improve development practices.",
          },
        ],
        stack: ["Kafka", "AWS SSM Parameter Store", "JUnit", "Testcontainers"],
      },
      {
        title: "Associate Software Engineer",
        period: "Aug 2022 – Nov 2024",
        bullets: [
          {
            text: "Created, maintained and optimized REST endpoints, implementing unit and integration test cases using JUnit and Mockito.",
          },
          {
            text: "Implemented frontend functionalities effectively using Angular, HTML, and CSS.",
          },
          {
            text: "Ensured code quality by utilizing SonarQube and Veracode to enforce coding standards and best practices.",
          },
          {
            text: "Utilized ALM tools Jenkins and Spinnaker for CI/CD pipelines, experienced with deployment of services across Development and Production environments.",
          },
          {
            text: "Successfully migrated microservices from EC2 to ECS, cutting infrastructure costs by 20% and optimizing resource utilization and scalability to handle 2x traffic spikes without downtime.",
          },
          {
            text: "Practiced Agile Scrum methodologies, participated in regular sprint cycles and delivering demos to product teams/stakeholders.",
          },
        ],
        stack: ["Angular", "JUnit", "Mockito", "SonarQube", "Veracode", "Jenkins", "Spinnaker", "AWS EC2", "AWS ECS"],
      },
    ],
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const RoleBlock = ({ role }) => (
  <div className={styles.role}>
    <div className={styles.roleHeader}>
      <h3>{role.title}</h3>
      <span className={styles.period}>
        {role.current && (
          <span className={styles.liveBadge}>
            <span className={styles.liveDot} />
            present
          </span>
        )}
        {role.period}
      </span>
    </div>
    <ul className={styles.bulletList}>
      {role.bullets.map((bullet) => (
        <li className={styles.bullet} key={bullet.text.slice(0, 40)}>
          <span className={styles.bulletGlyph}>&#9657;</span>
          <span>
            {bullet.text}
            {bullet.sub && (
              <ul className={styles.subList}>
                {bullet.sub.map((s) => (
                  <li className={styles.subBullet} key={s.slice(0, 40)}>
                    <span className={styles.subGlyph}>&#8250;</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            )}
          </span>
        </li>
      ))}
    </ul>
    {role.stack && (
      <div className={styles.stackRow}>
        {role.stack.map((tech) => (
          <span className={styles.stackChip} key={tech}>
            {tech}
          </span>
        ))}
      </div>
    )}
  </div>
);

export const Experience = () => {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"],
  });

  return (
    <section id="experience" className={styles.container}>
      <h1 className={`sectionTitle ${styles.heading}`}>Experience</h1>

      <motion.div
        className={styles.statGrid}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {STATS.map(({ value, label, glyph }) => (
          <motion.div className={styles.statCard} variants={cardVariant} key={label}>
            <span className={styles.statGlyph} aria-hidden="true">
              {glyph}
            </span>
            <strong>{value}</strong>
            <span>{label}</span>
          </motion.div>
        ))}
      </motion.div>

      <div className={styles.timeline} ref={timelineRef}>
        <div className={styles.timelineLine}>
          <motion.div className={styles.timelineFill} style={{ scaleY: scrollYProgress }} />
        </div>

        {EXPERIENCE.map(({ company, slug, location, roles }) => (
          <motion.div
            className={styles.entry}
            key={company}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className={styles.node} aria-hidden="true" />
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.dots} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                <span className={styles.path}>~/experience/{slug}</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.companyRow}>
                  <h2>{company}</h2>
                  <span className={styles.location}>{location}</span>
                </div>
                {roles.map((role, rIdx) => (
                  <div key={role.title}>
                    {rIdx > 0 && (
                      <div className={styles.promotion}>
                        <span>&#8593; promoted</span>
                      </div>
                    )}
                    <RoleBlock role={role} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;

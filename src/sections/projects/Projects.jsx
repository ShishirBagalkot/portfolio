import { useState } from "react";
import { motion } from "framer-motion";
import TerminalTabs from "../../common/TerminalTabs";
import TiltCard from "../../common/TiltCard";
import styles from "./ProjectsStyles.module.css";
import codeFlux from "../../assets/favicon.png";
import triply from "../../assets/triply.svg";
import triplyPreview from "../../assets/triply-preview.jpg";
import codeFluxPreview from "../../assets/codeflux-preview.jpg";

const PROJECTS = [
  {
    key: "triply",
    title: "Triply",
    tagline: "Trip planner",
    link: "https://trip-planner-web-nine.vercel.app/",
    icon: triply,
    preview: triplyPreview,
    highlights: [
      "Curated day-by-day itineraries for 15+ Indian destinations, each with suggested trip lengths",
      "Compare a reviewed standard itinerary against real traveler plans, then remix one into your own",
      "Destination search with local context — culture, logistics, and highlights for every city",
    ],
  },
  {
    key: "codeflux",
    title: "Code Flux",
    tagline: "Tech blog",
    link: "https://code-flux.web.app/explore",
    icon: codeFlux,
    preview: codeFluxPreview,
    highlights: [
      "Practical write-ups on Java, Angular, and general dev topics",
      "Articles organized into Java, Angular, and Others categories for quick browsing",
      "Covers real-world topics like Java Generics, functional interfaces, and dev environment setup",
    ],
  },
];

const panelBodyVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const hostname = (url) => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

export const Projects = () => {
  const [activeTab, setActiveTab] = useState(PROJECTS[0].key);
  const project = PROJECTS.find((p) => p.key === activeTab) ?? PROJECTS[0];

  return (
    <section id="projects" className={styles.container}>
      <h1 className={`sectionTitle ${styles.heading}`}>Projects</h1>

      <TerminalTabs
        tabs={PROJECTS.map((p) => ({ key: p.key, label: p.title }))}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        ariaLabel="Projects"
        minHeight={280}
      >
        <motion.div
          className={styles.panelBody}
          variants={panelBodyVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div className={styles.info} variants={itemVariants}>
            <div className={styles.infoHead}>
              <TiltCard className={styles.iconWrap} maxTilt={10}>
                <img src={project.icon} alt={`${project.title} logo`} />
              </TiltCard>
              <div>
                <h3>{project.title}</h3>
                <p className={styles.tagline}>{project.tagline}</p>
              </div>
            </div>
            {project.highlights.length > 0 && (
              <ul className={styles.highlights}>
                {project.highlights.map((point) => (
                  <li key={point}>
                    <span className={styles.bulletGlyph} aria-hidden="true">&#9657;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className={styles.viewLink}
              data-cursor-hover
            >
              view project <span>→</span>
            </a>
          </motion.div>

          <motion.a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className={styles.previewLink}
            data-cursor-hover
            aria-label={`Open ${project.title} (${hostname(project.link)})`}
            variants={itemVariants}
          >
            <TiltCard className={styles.previewFrame} maxTilt={6} glare>
              <img src={project.preview} alt={`${project.title} site preview`} loading="lazy" />
              <span className={styles.previewUrl}>{hostname(project.link)}</span>
            </TiltCard>
          </motion.a>
        </motion.div>
      </TerminalTabs>
    </section>
  );
}

export default Projects;

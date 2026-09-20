import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import styles from "../sections/projects/ProjectsStyles.module.css";

function ProjectsCard({ imgSrc, projectLink, projectTitle, projectDesc }) {
  return (
    <motion.a
      href={projectLink}
      target="_blank"
      rel="noreferrer"
      className={styles.card}
      data-cursor-hover
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <TiltCard className={styles.cardTilt} maxTilt={8}>
        <img className="hover" src={imgSrc} alt={`${projectTitle} logo`} />
      </TiltCard>
      <h3>{projectTitle}</h3>
      <p>{projectDesc}</p>
      <span className={styles.viewLink} aria-hidden="true">
        view project <span>→</span>
      </span>
    </motion.a>
  );
}

export default ProjectsCard;

import { motion } from "framer-motion";
import styles from "./ProjectsStyles.module.css";
import codeFlux from "../../assets/favicon.png";
import ProjectsCard from "../../common/ProjectsCard";

export const Projects = () => {
  return (
    <section id="projects" className={styles.container}>
      <motion.h1
        className="sectionTitle"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h1>
      <div className={styles.projectsContainer}>
        <ProjectsCard imgSrc={codeFlux} projectLink='https://code-flux.web.app/explore' projectTitle='Code Flux' projectDesc='Tech blog'/>
      </div>
    </section>
  );
}

export default Projects;

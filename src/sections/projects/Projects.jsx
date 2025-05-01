import styles from "./ProjectsStyles.module.css";
import codeFlux from "../../assets/favicon.png";
import ProjectsCard from "../../common/ProjectsCard";

export const Projects = () => {
  return (
    <section id="projects" className={styles.container}>
      <h1 className="sectionTitle">Projects</h1>
      <div className={styles.projectsContainer}>
        <ProjectsCard imgSrc={codeFlux} projectLink='https://code-flux.web.app/explore' projectTitle='Code Flux' projectDesc='Tech blog'/>
      </div>
    </section>
  );
}

export default Projects;
import styles from "./ProjectsStyles.module.css";
import viberr from "../../assets/viberr.png";
import ProjectsCard from "../../common/ProjectsCard";

export const Projects = () => {
  return (
    <section id="projects" className={styles.container}>
      <h1 className="sectionTitle">Projects</h1>
      <div className={styles.projectsContainer}>
        <ProjectsCard imgSrc={viberr} projectLink='' projectTitle='Project 1' projectDesc='Project 1 desc'/>
        <ProjectsCard imgSrc={viberr} projectLink='' projectTitle='Project 1' projectDesc='Project 1 desc'/>
        <ProjectsCard imgSrc={viberr} projectLink='' projectTitle='Project 1' projectDesc='Project 1 desc'/>
      </div>
    </section>
  );
}

export default Projects;
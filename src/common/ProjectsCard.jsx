function ProjectsCard({ imgSrc, projectLink, projectTitle, projectDesc }) {
  return (
    <a href={projectLink} target="_blank">
      <img className="hover" src={imgSrc} alt={`${projectTitle} logo`} />
      <h3>{projectTitle}</h3>
      <p>{projectDesc}</p>
    </a>
  );
}

export default ProjectsCard;
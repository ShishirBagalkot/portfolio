function SkillsList({ logoSrc, skillName }) {
  return (
    <span>
      <img src={logoSrc} alt="check mark icon" />
      <p>{skillName}</p>
    </span>
  );
}

export default SkillsList;
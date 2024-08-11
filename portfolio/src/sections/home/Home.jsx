import styles from "../home/HomeStyles.module.css";
import profilePic from "../../assets/hero-img.png";
import lightThemeIcon from "../../assets/sun.svg";
import darkThemeIcon from "../../assets/moon.svg";
import lightTwitterIcon from "../../assets/twitter-light.svg";
import darkTwitterIcon from "../../assets/twitter-dark.svg";
import lightGitHubIcon from "../../assets/github-light.svg";
import darkGitHubIcon from "../../assets/github-dark.svg";
import lightLinkedInIcon from "../../assets/linkedin-light.svg";
import darkLinkedInIcon from "../../assets/linkedin-dark.svg";
import { useTheme } from "../../common/ThemeContext";

function Home() {
  const { theme, toggleTheme } = useTheme();
  const themeIcon = theme === "light" ? lightThemeIcon : darkThemeIcon;
  const twitterIcon = theme === "light" ? lightTwitterIcon : darkTwitterIcon;
  const gitHubIcon = theme === "light" ? lightGitHubIcon : darkGitHubIcon;
  const linkedInIcon = theme === "light" ? lightLinkedInIcon : darkLinkedInIcon;

  return (
    <section id="home" className={styles.container}>
      <div className={styles.colorModeContainer}>
        <img className={styles.home} src={profilePic} alt="Profile Pic" />
        <img
          className={styles.colorMode}
          src={themeIcon}
          alt="Theme Icon"
          onClick={toggleTheme}
        />
      </div>
      <div className={styles.info}>
        <h1>
          Shishir <br /> Bagalkot
        </h1>
        <h2>Full Stack Developer</h2>
        <span>
          <a href="https://www.linkedin.com/in/shishir-bagalkot/" target="_blank">
            <img src={linkedInIcon} alt="Linkedin Icon" />
          </a>
          <a href="https://github.com/ShishirBagalkot" target="_blank">
            <img src={gitHubIcon} alt="Github Icon" />
          </a>
          <a href="https://x.com/shishirbagalkot" target="_blank">
            <img src={twitterIcon} alt="Twitter Icon" />
          </a>
        </span>
        <a
          href="https://drive.google.com/file/d/1TGZBYF7YHKFAKH5_aOPczBUWLcYkwZ45/view?usp=drive_link"
          target="_blank"
        >
          <button className="hover">Resume</button>
        </a>
      </div>
    </section>
  );
}

export default Home;
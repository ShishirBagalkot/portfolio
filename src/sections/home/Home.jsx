import { motion } from "framer-motion";
import styles from "../home/HomeStyles.module.css";
import profilePic from "../../assets/DP.jpg";
import lightThemeIcon from "../../assets/sun.svg";
import darkThemeIcon from "../../assets/moon.svg";
import lightTwitterIcon from "../../assets/twitter-light.svg";
import darkTwitterIcon from "../../assets/twitter-dark.svg";
import lightGitHubIcon from "../../assets/github-light.svg";
import darkGitHubIcon from "../../assets/github-dark.svg";
import lightLinkedInIcon from "../../assets/linkedin-light.svg";
import darkLinkedInIcon from "../../assets/linkedin-dark.svg";
import { useTheme } from "../../common/ThemeContext";
import { useTypewriter } from "../../common/useTypewriter";
import TiltCard from "../../common/TiltCard";
import MagneticButton from "../../common/MagneticButton";

const ROLES = [
  "Full Stack Developer",
  "Java · Spring Boot · Angular",
  "REST APIs at scale",
  "Builds reliable systems",
];

export const Home = () => {
  const { theme, toggleTheme } = useTheme();
  const themeIcon = theme === "light" ? lightThemeIcon : darkThemeIcon;
  const twitterIcon = theme === "light" ? lightTwitterIcon : darkTwitterIcon;
  const gitHubIcon = theme === "light" ? lightGitHubIcon : darkGitHubIcon;
  const linkedInIcon = theme === "light" ? lightLinkedInIcon : darkLinkedInIcon;
  const typed = useTypewriter(ROLES);

  return (
    <section id="home" className={styles.container}>
      <motion.div
        className={styles.colorModeContainer}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={styles.radar} aria-hidden="true" />
        <TiltCard className={styles.tiltWrap} maxTilt={10} scale={1.03}>
          <img className={styles.home} src={profilePic} alt="Profile Pic" />
        </TiltCard>
        <img
          className={`${styles.colorMode} hover`}
          src={themeIcon}
          alt="Toggle theme"
          onClick={toggleTheme}
          data-cursor-hover
        />
      </motion.div>
      <div className={styles.info}>
        <motion.h1
          className={styles.glitchName}
          data-text="Shishir Bagalkot"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          Shishir <br /> Bagalkot
        </motion.h1>
        <motion.h2
          className={styles.role}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
        >
          <span aria-hidden="true">
            {typed}
            <span className={styles.caret} />
          </span>
          <span className={styles.srOnly}>{ROLES.join(" — ")}</span>
        </motion.h2>
        <motion.span
          className={styles.socials}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
        >
          <MagneticButton as="a" href="https://www.linkedin.com/in/shishir-bagalkot/" target="_blank" data-cursor-hover>
            <img src={linkedInIcon} alt="Linkedin Icon" />
          </MagneticButton>
          <MagneticButton as="a" href="https://github.com/ShishirBagalkot" target="_blank" data-cursor-hover>
            <img src={gitHubIcon} alt="Github Icon" />
          </MagneticButton>
          <MagneticButton as="a" href="https://x.com/shishirbagalkot" target="_blank" data-cursor-hover>
            <img src={twitterIcon} alt="Twitter Icon" />
          </MagneticButton>
        </motion.span>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: "easeOut" }}
        >
          <MagneticButton
            as="a"
            href="https://drive.google.com/file/d/1_RRWJ5Hy0Kx-0B7OS4EvZMbeUcGTpLvP/view?usp=sharing"
            target="_blank"
            strength={0.25}
            data-cursor-hover
          >
            <button className="hover">Resume</button>
          </MagneticButton>
        </motion.div>
      </div>
      <a href="#experience" className={styles.scrollCue} aria-label="Scroll to Experience section" data-cursor-hover>
        <span />
      </a>
    </section>
  );
}

export default Home;

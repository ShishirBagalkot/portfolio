import styles from "./HomeStyles.module.css";
import profilePic from "../assets/hero-img.png";
import themeIcon from "../assets/sun.svg";

function Home() {
  return (
    <section id="home" className={styles.container}>
      <div className={styles.colorModeContainer}>
        <img className={styles.home} src={profilePic} alt="Profile Pic" />
        <img className={styles.colorMode} src={themeIcon} alt="Theme Icon" />
      </div>
      <div className={styles.info}>
        <h1>
            Shishir <br /> Bagalkot
        </h1>
        <h2>Fullstack Developer</h2>
        <span>
            <a href=""></a>
        </span>
      </div>
    </section>
  );
}

export default Home;

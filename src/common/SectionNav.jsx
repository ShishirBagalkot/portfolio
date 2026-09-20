import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import styles from "./SectionNav.module.css";

const SECTIONS = [
  { id: "home", label: "Home", glyph: "01" },
  { id: "experience", label: "Experience", glyph: ">_" },
  { id: "projects", label: "Projects", glyph: "<>" },
  { id: "skills", label: "Skills", glyph: "{}" },
];

export const SectionNav = () => {
  const [active, setActive] = useState("home");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  const handleClick = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={styles.nav} aria-label="Section navigation">
      <div className={styles.rail}>
        <motion.div className={styles.railFill} style={{ scaleY: scrollYProgress }} />
      </div>
      <ul>
        {SECTIONS.map(({ id, label, glyph }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={handleClick(id)}
              className={active === id ? styles.active : ""}
              data-cursor-hover
            >
              <span className={styles.glyph}>{glyph}</span>
              <span className={styles.label}>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SectionNav;

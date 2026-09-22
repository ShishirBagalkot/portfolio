import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "./ThemeContext";
import styles from "./CelestialToggle.module.css";

const MOON_CRATERS = [
  { x: 32, y: 30, r: 22 },
  { x: 62, y: 45, r: 16 },
  { x: 42, y: 68, r: 12 },
];

export const CelestialToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const isDark = theme === "dark";
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;

        if (y < 80) {
          setVisible(true);
        } else if (delta > 6) {
          setVisible(false); // scrolling down through content — get out of the way
        } else if (delta < -6) {
          setVisible(true); // scrolling up — bring it back
        }

        lastY.current = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const swap = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { rotate: -90, scale: 0.4, opacity: 0 },
        animate: { rotate: 0, scale: 1, opacity: 1 },
        exit: { rotate: 90, scale: 0.4, opacity: 0 },
      };

  return (
    <motion.button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      onFocus={() => setVisible(true)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      data-cursor-hover
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : -18,
        scale: visible ? 1 : 0.8,
      }}
      transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeInOut" }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <span className={`${styles.glow} ${isDark ? styles.glowMoon : styles.glowSun}`} aria-hidden="true" />
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            className={`${styles.body} ${styles.moon}`}
            {...swap}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            aria-hidden="true"
          >
            {MOON_CRATERS.map((c, i) => (
              <span
                key={i}
                className={styles.crater}
                style={{ left: `${c.x}%`, top: `${c.y}%`, width: `${c.r}%`, height: `${c.r}%` }}
              />
            ))}
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            className={`${styles.body} ${styles.sun}`}
            {...swap}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default CelestialToggle;

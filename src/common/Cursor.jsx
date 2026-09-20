import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styles from "./Cursor.module.css";

export const Cursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 22, stiffness: 300, mass: 0.4 });
  const ringY = useSpring(y, { damping: 22, stiffness: 300, mass: 0.4 });
  const hideTimeout = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      clearTimeout(hideTimeout.current);
      hideTimeout.current = setTimeout(() => setVisible(false), 3000);

      const target = e.target;
      const interactive = target.closest(
        "a, button, .hover, [data-cursor-hover]"
      );
      setHovering(Boolean(interactive));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      clearTimeout(hideTimeout.current);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className={styles.cursorLayer} aria-hidden="true">
      <motion.div
        className={styles.dot}
        style={{ translateX: x, translateY: y, opacity: visible ? 1 : 0 }}
      />
      <motion.div
        className={`${styles.ring} ${hovering ? styles.ringActive : ""}`}
        style={{ translateX: ringX, translateY: ringY, opacity: visible ? 1 : 0 }}
      />
    </div>
  );
};

export default Cursor;

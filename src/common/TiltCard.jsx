import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import styles from "./TiltCard.module.css";

export const TiltCard = ({
  children,
  className = "",
  maxTilt = 12,
  glare = true,
  scale = 1.02,
  ...rest
}) => {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springConfig = { damping: 18, stiffness: 180, mass: 0.6 };
  const rotateX = useSpring(
    useTransform(py, [0, 1], [maxTilt, -maxTilt]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(px, [0, 1], [-maxTilt, maxTilt]),
    springConfig
  );
  const scaleSpring = useSpring(1, springConfig);
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx} ${gy}, rgba(var(--accent-rgb), 0.25), transparent 60%)`
  );

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleEnter = () => scaleSpring.set(scale);

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
    scaleSpring.set(1);
  };

  return (
    <motion.div
      ref={ref}
      className={`${styles.tilt} ${className}`}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        scale: scaleSpring,
      }}
      {...rest}
    >
      {children}
      {glare && (
        <motion.div
          className={styles.glare}
          style={{ background: glareBackground }}
        />
      )}
    </motion.div>
  );
};

export default TiltCard;

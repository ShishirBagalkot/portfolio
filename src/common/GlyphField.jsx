import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeContext";

const GLYPHS = ["{", "}", "<", ">", "/", "*", "#", "0", "1", "=>", ";", "λ", "∑", "π"];

const PALETTE = {
  light: {
    dot: "8, 145, 178",
    link: "8, 145, 178",
    glyph: "124, 58, 237",
    mouseLink: "124, 58, 237",
  },
  dark: {
    dot: "34, 211, 238",
    link: "34, 211, 238",
    glyph: "167, 139, 250",
    mouseLink: "167, 139, 250",
  },
};

const CLOUD_PUFFS = [
  [-0.9, 0.15, 0.55],
  [-0.35, -0.18, 0.72],
  [0.25, -0.08, 0.66],
  [0.78, 0.18, 0.5],
  [0.12, 0.32, 0.6],
];

function createClouds(width, height, count) {
  const clouds = [];
  for (let i = 0; i < count; i++) {
    const depth = 0.4 + Math.random() * 0.6;
    clouds.push({
      x: Math.random() * width,
      y: height * (0.06 + Math.random() * 0.26),
      vx: (0.05 + Math.random() * 0.09) * depth,
      scale: (26 + Math.random() * 24) * depth,
      opacity: 0.14 + Math.random() * 0.16 * depth,
    });
  }
  return clouds;
}

function createParticles(width, height, count) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const isGlyph = i % 4 === 0;
    const depth = 0.35 + Math.random() * 0.65;
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18 * depth,
      vy: (Math.random() - 0.5) * 0.18 * depth,
      depth,
      isGlyph,
      char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      size: isGlyph ? 10 + depth * 12 : 1 + depth * 1.8,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.006,
      phase: Math.random() * Math.PI * 2,
    });
  }
  return particles;
}

export const GlyphField = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let shootingStars = [];
    let clouds = [];
    let birds = [];
    let animationId;
    let time = 0;
    let running = true;

    const mouse = { x: -9999, y: -9999, active: false };

    const maybeSpawnShootingStar = () => {
      if (shootingStars.length >= 2 && Math.random() > 0.002) return;
      if (Math.random() > 0.0035) return;
      const startX = Math.random() * width * 0.7;
      const startY = Math.random() * height * 0.35;
      const speed = 7 + Math.random() * 4;
      const angle = Math.PI / 5 + (Math.random() - 0.5) * 0.2;
      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 40 + Math.random() * 20,
      });
    };

    const drawShootingStars = () => {
      shootingStars = shootingStars.filter((s) => s.life < s.maxLife);
      for (const s of shootingStars) {
        s.x += s.vx;
        s.y += s.vy;
        s.life += 1;
        const fade = 1 - s.life / s.maxLife;
        const tailX = s.x - s.vx * 5;
        const tailY = s.y - s.vy * 5;

        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.9 * fade})`);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${fade})`;
        ctx.shadowColor = "rgba(255, 255, 255, 0.9)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const drawClouds = () => {
      for (const c of clouds) {
        if (!reduceMotion) {
          c.x += c.vx;
          if (c.x - c.scale * 2 > width) c.x = -c.scale * 2;
        }

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.filter = "blur(7px)";
        ctx.fillStyle = `rgba(120, 140, 185, ${c.opacity})`;
        ctx.beginPath();
        for (const [dx, dy, r] of CLOUD_PUFFS) {
          ctx.moveTo(dx * c.scale + r * c.scale, dy * c.scale);
          ctx.arc(dx * c.scale, dy * c.scale, r * c.scale, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.restore();
      }
    };

    const maybeSpawnBird = () => {
      if (birds.length >= 1 && Math.random() > 0.0015) return;
      if (Math.random() > 0.003) return;
      const fromLeft = Math.random() > 0.5;
      const speed = 2.1 + Math.random() * 1.2;
      birds.push({
        x: fromLeft ? -30 : width + 30,
        y: height * (0.08 + Math.random() * 0.22),
        vx: fromLeft ? speed : -speed,
        vy: (Math.random() - 0.5) * 0.3,
        wingPhase: Math.random() * Math.PI * 2,
        life: 0,
        maxLife: 260 + Math.random() * 140,
        scale: 0.7 + Math.random() * 0.6,
      });
    };

    const drawBirds = () => {
      birds = birds.filter((b) => b.life < b.maxLife && b.x > -60 && b.x < width + 60);
      for (const b of birds) {
        if (!reduceMotion) {
          b.x += b.vx;
          b.y += b.vy;
          b.wingPhase += 0.35;
        }
        b.life += 1;

        const fadeIn = Math.min(1, b.life / 20);
        const fadeOut = Math.min(1, (b.maxLife - b.life) / 20);
        const alpha = Math.min(fadeIn, fadeOut) * 0.5;
        const flap = Math.sin(b.wingPhase) * 5 * b.scale;
        const span = 9 * b.scale;

        ctx.save();
        ctx.translate(b.x, b.y);
        if (b.vx < 0) ctx.scale(-1, 1);
        ctx.strokeStyle = `rgba(60, 70, 100, ${alpha})`;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-span, -flap);
        ctx.quadraticCurveTo(-span * 0.4, flap * 0.6, 0, 0);
        ctx.quadraticCurveTo(span * 0.4, flap * 0.6, span, -flap);
        ctx.stroke();
        ctx.restore();
      }
    };

    const density = window.innerWidth < 700 ? 26000 : 15000;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(28, Math.min(130, Math.floor((width * height) / density)));
      particles = createParticles(width, height, count);
      const cloudCount = width < 700 ? 2 : 4;
      clouds = createClouds(width, height, cloudCount);
    };

    const onPointerMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const onPointerLeave = () => {
      mouse.active = false;
    };

    const draw = () => {
      const isDark = themeRef.current === "dark";
      const palette = PALETTE[themeRef.current] || PALETTE.dark;
      ctx.clearRect(0, 0, width, height);
      time += 1;

      if (isDark) {
        if (!reduceMotion) maybeSpawnShootingStar();
        drawShootingStars();
      } else {
        drawClouds();
        if (!reduceMotion) maybeSpawnBird();
        drawBirds();
      }

      const linkDist = width < 700 ? 85 : 120;
      const mouseDist = width < 700 ? 0 : 170;

      // connective lines between nearby dots
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.isGlyph) continue;
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          if (q.isGlyph) continue;
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * 0.18 * Math.min(p.depth, q.depth);
            ctx.strokeStyle = `rgba(${palette.link}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseDist) {
            const alpha = (1 - dist / mouseDist) * 0.5;
            ctx.strokeStyle = `rgba(${palette.mouseLink}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            if (!reduceMotion) {
              const push = (mouseDist - dist) / mouseDist;
              p.x += (dx / (dist || 1)) * push * 0.6;
              p.y += (dy / (dist || 1)) * push * 0.6;
            }
          }
        }
      }

      // particles themselves
      for (const p of particles) {
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.rotSpeed;

          if (p.x < -30) p.x = width + 30;
          if (p.x > width + 30) p.x = -30;
          if (p.y < -30) p.y = height + 30;
          if (p.y > height + 30) p.y = -30;
        }

        if (p.isGlyph) {
          const pulse = 0.5 + 0.5 * Math.sin(time * 0.01 + p.phase);
          const alpha = 0.08 + pulse * 0.14 * p.depth;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.font = `${p.size}px "Roboto Mono", monospace`;
          ctx.fillStyle = `rgba(${palette.glyph}, ${alpha})`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(p.char, 0, 0);
          ctx.restore();
        } else {
          const pulse = 0.6 + 0.4 * Math.sin(time * 0.02 + p.phase);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${palette.dot}, ${0.35 + 0.35 * p.depth})`;
          ctx.shadowColor = `rgba(${palette.dot}, 0.8)`;
          ctx.shadowBlur = 6 * p.depth;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    };

    const loop = () => {
      if (!running) return;
      draw();
      animationId = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(animationId);
      } else {
        running = true;
        loop();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (reduceMotion) {
      draw();
    } else {
      loop();
    }

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default GlyphField;

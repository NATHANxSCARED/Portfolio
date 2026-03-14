import { useEffect, useRef } from "react";

export default function StarField({ count = 180 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Génération procédurale des étoiles
    const stars = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.6 + 0.2,          // rayon 0.2 → 1.8px
      alpha: Math.random() * 0.7 + 0.3,       // opacité de base
      speed: Math.random() * 0.008 + 0.002,   // vitesse de scintillement
      phase: Math.random() * Math.PI * 2,     // phase décalée
    }));

    let t = 0;
    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      stars.forEach((s) => {
        const flicker = s.alpha + Math.sin(t * s.speed * 60 + s.phase) * 0.25;
        ctx.beginPath();
        ctx.arc(s.x * width, s.y * height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.min(1, Math.max(0, flicker))})`;
        ctx.fill();
      });

      t++;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
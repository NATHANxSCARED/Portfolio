import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Champ d'étoiles 3D (Three.js) avec parallaxe souris subtile.
 * - Étoiles réparties dans un volume sphérique pour un vrai effet de profondeur
 * - Scintillement individuel géré via un shader (peu coûteux, un seul draw call)
 * - Rotation autonome très lente + parallaxe douce au mouvement de la souris
 * - Respecte prefers-reduced-motion et se met en pause quand l'onglet est masqué
 */
export default function StarField({ count = 900 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // --- Scene / caméra / renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // --- Génération des étoiles dans une sphère ---
    const STAR_COUNT = count;
    const positions = new Float32Array(STAR_COUNT * 3);
    const sizes = new Float32Array(STAR_COUNT);
    const phases = new Float32Array(STAR_COUNT);
    const speeds = new Float32Array(STAR_COUNT);
    const colors = new Float32Array(STAR_COUNT * 3);

    const palette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#cfe9ff"),
      new THREE.Color("#9fd3ff"),
      new THREE.Color("#c9b8ff"),
    ];

    for (let i = 0; i < STAR_COUNT; i++) {
      // Répartition uniforme dans une coquille sphérique (évite le paquet au centre)
      const radius = 6 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      sizes[i] = Math.random() * 1.6 + 0.5;
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = Math.random() * 1.2 + 0.4;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("phase", new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute("speed", new THREE.BufferAttribute(speeds, 1));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        attribute float size;
        attribute float phase;
        attribute float speed;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vTwinkle;
        uniform float uTime;
        uniform float uPixelRatio;

        void main() {
          vColor = color;
          vTwinkle = 0.55 + 0.45 * sin(uTime * speed + phase);

          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * uPixelRatio * (220.0 / -mvPosition.z) * (0.7 + vTwinkle * 0.5);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vTwinkle;

        void main() {
          // Point rond avec halo doux (sprite procédural, pas de texture à charger)
          vec2 uv = gl_PointCoord - vec2(0.5);
          float d = length(uv);
          float core = smoothstep(0.5, 0.0, d);
          float glow = smoothstep(0.5, 0.15, d) * 0.35;
          float alpha = (core + glow) * vTwinkle;
          if (alpha < 0.02) discard;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // --- Parallaxe souris ---
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };
    let currentRotation = { x: 0, y: 0 };

    const handlePointerMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!prefersReducedMotion) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
    }

    // --- Resize ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    };
    window.addEventListener("resize", handleResize);

    // --- Pause quand l'onglet n'est pas visible (perf) ---
    let running = true;
    const handleVisibility = () => {
      running = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // --- Boucle d'animation ---
    const clock = new THREE.Clock();
    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!running) return;

      const elapsed = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsed;

      if (!prefersReducedMotion) {
        // Rotation autonome très lente, façon dérive spatiale
        points.rotation.y = elapsed * 0.015;
        points.rotation.x = Math.sin(elapsed * 0.05) * 0.05;

        // Parallaxe : la cible suit la souris, avec un lissage (lerp)
        targetRotation.x = mouse.y * 0.12;
        targetRotation.y = mouse.x * 0.18;
        currentRotation.x += (targetRotation.x - currentRotation.x) * 0.03;
        currentRotation.y += (targetRotation.y - currentRotation.y) * 0.03;

        camera.position.x = currentRotation.y * 1.5;
        camera.position.y = -currentRotation.x * 1.5;
        camera.lookAt(0, 0, 0);
      } else {
        points.rotation.y = elapsed * 0.005;
      }

      renderer.render(scene, camera);
    };
    animate();

    // --- Nettoyage ---
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
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
        display: "block",
      }}
    />
  );
}

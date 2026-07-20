import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { animate, stagger } from "animejs";
import { FaCode, FaShieldHalved } from "react-icons/fa6";
import {
  SiFigma,
  SiN8N,
  SiNodedotjs,
  SiReact,
  SiThreedotjs,
  SiWordpress,
} from "react-icons/si";

const constellationSkills = [
  {
    name: "React",
    icon: SiReact,
    color: 0x61dafb,
    cssColor: "#61dafb",
    position: [-3.3, 1.65, 0.4],
    description:
      "Des interfaces modernes, fluides et construites avec des composants réutilisables.",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: 0x64d96b,
    cssColor: "#64d96b",
    position: [-1.15, 2.5, -0.7],
    description:
      "Le moteur back-end de mes API, services et applications JavaScript.",
  },
  {
    name: "n8n",
    icon: SiN8N,
    color: 0xff6d5a,
    cssColor: "#ff6d5a",
    position: [1.5, 2.25, 0.2],
    description:
      "Des automatisations qui relient les outils et font circuler les données intelligemment.",
  },
  {
    name: "UI / UX",
    icon: SiFigma,
    color: 0xa78bfa,
    cssColor: "#a78bfa",
    position: [3.35, 0.85, -0.5],
    description:
      "Des parcours simples et des interfaces soignées, pensés avant d’être développés.",
  },
  {
    name: "3D",
    icon: SiThreedotjs,
    color: 0xec4899,
    cssColor: "#ec4899",
    position: [2.85, -1.55, 0.6],
    description:
      "Des expériences web immersives avec Three.js, WebGL et une vraie profondeur visuelle.",
  },
  {
    name: "Sécurité",
    icon: FaShieldHalved,
    color: 0xfb7185,
    cssColor: "#fb7185",
    position: [0.55, -2.45, -0.35],
    description:
      "Authentification, protection des données et bonnes pratiques intégrées dès la conception.",
  },
  {
    name: "WordPress",
    icon: SiWordpress,
    color: 0x60a5fa,
    cssColor: "#60a5fa",
    position: [-2.05, -2.15, 0.15],
    description:
      "Des sites administrables et personnalisés, adaptés aux besoins réels du client.",
  },
  {
    name: "Full-stack",
    icon: FaCode,
    color: 0x00d4ff,
    cssColor: "#00d4ff",
    position: [-3.7, -0.55, -0.45],
    description:
      "Une vision globale du produit, de la base de données jusqu’à l’expérience finale.",
  },
];

const DEFAULT_CAMERA_POSITION = new THREE.Vector3(0, 0, 9.5);
const DEFAULT_CAMERA_TARGET = new THREE.Vector3(0, 0, 0);

const CAMERA_DISTANCE_FROM_SKILL = 3.2;
const CAMERA_ANIMATION_DURATION = 1100;
const DRAG_THRESHOLD = 5;

function SkillConstellation() {
  const shellRef = useRef(null);
  const canvasRef = useRef(null);
  const detailRef = useRef(null);

  const sceneStateRef = useRef(null);
  const selectedIndexRef = useRef(null);

  const [selectedIndex, setSelectedIndex] = useState(null);

  const selectedSkill = useMemo(
    () =>
      selectedIndex === null ? null : constellationSkills[selectedIndex],
    [selectedIndex]
  );

  const SelectedIcon = selectedSkill?.icon;

  useEffect(() => {
    const shell = shellRef.current;
    const canvas = canvasRef.current;

    if (!shell || !canvas) {
      return undefined;
    }

    const reducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070b1d, 0.052);

    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.copy(DEFAULT_CAMERA_POSITION);

    const cameraTarget = DEFAULT_CAMERA_TARGET.clone();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const ambientLight = new THREE.AmbientLight(0x8ab4ff, 1.3);

    const keyLight = new THREE.PointLight(0x9be7ff, 28, 25);
    keyLight.position.set(2, 4, 6);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 20, 20);
    purpleLight.position.set(-4, -2, 4);

    scene.add(ambientLight, keyLight, purpleLight);

    const universe = new THREE.Group();
    scene.add(universe);

    const coreGeometry = new THREE.IcosahedronGeometry(0.72, 2);

    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0c2442,
      emissive: 0x00b8e6,
      emissiveIntensity: 1.5,
      roughness: 0.22,
      metalness: 0.55,
      transparent: true,
      opacity: 0.94,
    });

    const core = new THREE.Mesh(coreGeometry, coreMaterial);

    const coreWireGeometry = new THREE.IcosahedronGeometry(0.87, 1);
    const coreWireMaterial = new THREE.MeshBasicMaterial({
      color: 0x74e8ff,
      wireframe: true,
      transparent: true,
      opacity: 0.24,
    });

    const coreWire = new THREE.Mesh(coreWireGeometry, coreWireMaterial);
    universe.add(core, coreWire);

    const nodeGeometry = new THREE.IcosahedronGeometry(0.34, 2);
    const ringGeometry = new THREE.TorusGeometry(0.54, 0.012, 8, 64);

    const interactiveMeshes = [];
    const nodes = [];

    constellationSkills.forEach((skill, index) => {
      const node = new THREE.Group();

      node.position.set(...skill.position);
      node.userData.basePosition = new THREE.Vector3(...skill.position);
      node.userData.phase = index * 0.82;
      node.userData.skillIndex = index;

      const material = new THREE.MeshPhysicalMaterial({
        color: skill.color,
        emissive: skill.color,
        emissiveIntensity: 0.62,
        roughness: 0.25,
        metalness: 0.35,
        transparent: true,
        opacity: 0.9,
      });

      const planet = new THREE.Mesh(nodeGeometry, material);
      planet.userData.skillIndex = index;

      const ringMaterial = new THREE.MeshBasicMaterial({
        color: skill.color,
        transparent: true,
        opacity: 0.28,
      });

      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI * (0.36 + (index % 3) * 0.12);
      ring.rotation.y = index * 0.45;
      ring.userData.skillIndex = index;

      node.add(planet, ring);
      universe.add(node);

      nodes.push(node);
      interactiveMeshes.push(planet, ring);
    });

    const connectionPositions = [];

    constellationSkills.forEach((skill) => {
      connectionPositions.push(0, 0, 0, ...skill.position);
    });

    const connectionsGeometry = new THREE.BufferGeometry();
    connectionsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(connectionPositions, 3)
    );

    const connectionsMaterial = new THREE.LineBasicMaterial({
      color: 0x3bc9ff,
      transparent: true,
      opacity: 0.16,
    });

    const connections = new THREE.LineSegments(
      connectionsGeometry,
      connectionsMaterial
    );

    universe.add(connections);

    const dustCount = 260;
    const dustPositions = new Float32Array(dustCount * 3);

    for (let index = 0; index < dustCount; index += 1) {
      const radius = 2.5 + Math.random() * 5.5;
      const angle = Math.random() * Math.PI * 2;

      dustPositions[index * 3] = Math.cos(angle) * radius;
      dustPositions[index * 3 + 1] = (Math.random() - 0.5) * 6;
      dustPositions[index * 3 + 2] = Math.sin(angle) * 2.5 - 1.5;
    }

    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(dustPositions, 3)
    );

    const dustMaterial = new THREE.PointsMaterial({
      color: 0xb9eaff,
      size: 0.025,
      transparent: true,
      opacity: 0.55,
    });

    const dust = new THREE.Points(dustGeometry, dustMaterial);
    universe.add(dust);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(2, 2);

    let hoveredIndex = null;
    let isDragging = false;
    let hasDragged = false;
    let pointerDownX = 0;
    let pointerDownY = 0;
    let previousX = 0;
    let previousY = 0;
    let frameId;
    let isVisible = true;

    const updatePointer = (event) => {
      const rect = canvas.getBoundingClientRect();

      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const pickSkill = () => {
      universe.updateMatrixWorld(true);
      camera.updateMatrixWorld(true);

      raycaster.setFromCamera(pointer, camera);

      const hit = raycaster.intersectObjects(interactiveMeshes, false)[0];

      return hit?.object.userData.skillIndex ?? null;
    };

    const handlePointerDown = (event) => {
      updatePointer(event);

      isDragging = true;
      hasDragged = false;

      pointerDownX = event.clientX;
      pointerDownY = event.clientY;
      previousX = event.clientX;
      previousY = event.clientY;

      canvas.setPointerCapture?.(event.pointerId);
      canvas.style.cursor = "grabbing";
    };

    const handlePointerMove = (event) => {
      updatePointer(event);

      if (isDragging) {
        const totalDeltaX = event.clientX - pointerDownX;
        const totalDeltaY = event.clientY - pointerDownY;

        if (
          Math.hypot(totalDeltaX, totalDeltaY) >= DRAG_THRESHOLD
        ) {
          hasDragged = true;
        }

        if (hasDragged && selectedIndexRef.current === null) {
          const deltaX = event.clientX - previousX;
          const deltaY = event.clientY - previousY;

          universe.rotation.y += deltaX * 0.006;
          universe.rotation.x += deltaY * 0.003;

          universe.rotation.x = THREE.MathUtils.clamp(
            universe.rotation.x,
            -0.35,
            0.35
          );
        }

        previousX = event.clientX;
        previousY = event.clientY;

        return;
      }

      hoveredIndex = pickSkill();
      canvas.style.cursor = hoveredIndex === null ? "grab" : "pointer";
    };

    const stopDragging = (event) => {
      if (!isDragging) {
        return;
      }

      updatePointer(event);

      if (!hasDragged) {
        const hitIndex = pickSkill();

        if (hitIndex !== null) {
          setSelectedIndex(hitIndex);
        }
      }

      isDragging = false;
      hasDragged = false;

      canvas.releasePointerCapture?.(event.pointerId);

      hoveredIndex = pickSkill();
      canvas.style.cursor = hoveredIndex === null ? "grab" : "pointer";
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", stopDragging);
    canvas.addEventListener("pointercancel", stopDragging);
    canvas.addEventListener("pointerleave", stopDragging);

    const resize = () => {
      const width = shell.clientWidth;
      const height = shell.clientHeight;

      renderer.setSize(width, height, false);

      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(shell);
    resize();

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    intersectionObserver.observe(shell);

    sceneStateRef.current = {
      camera,
      cameraTarget,
      universe,
      nodes,
    };

    const introAnimations = [];

    if (!reducedMotion) {
      universe.scale.setScalar(0.02);

      introAnimations.push(
        animate(universe.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 1400,
          ease: "outExpo",
        })
      );

      introAnimations.push(
        animate(shell.querySelectorAll(".constellation-control"), {
          opacity: [0, 1],
          y: [18, 0],
          delay: stagger(55),
          duration: 700,
          ease: "outQuad",
        })
      );
    }

    const clock = new THREE.Clock();

    const render = () => {
      frameId = requestAnimationFrame(render);

      if (!isVisible) {
        return;
      }

      const elapsed = clock.getElapsedTime();

      core.rotation.x = elapsed * 0.22;
      core.rotation.y = elapsed * 0.34;

      coreWire.rotation.x = -elapsed * 0.11;
      coreWire.rotation.y = elapsed * 0.16;

      dust.rotation.y = elapsed * 0.012;

      const activeIndex = selectedIndexRef.current;

      nodes.forEach((node, index) => {
        const base = node.userData.basePosition;

        node.position.y =
          base.y +
          Math.sin(elapsed * 0.72 + node.userData.phase) * 0.11;

        node.rotation.y = elapsed * (0.25 + index * 0.012);
        node.rotation.z = Math.sin(elapsed * 0.35 + index) * 0.15;

        const isSelected = activeIndex === index;
        const isHovered = hoveredIndex === index;

        const targetScale = isSelected ? 2.2 : isHovered ? 1.42 : 1;
        const lerpSpeed = isSelected ? 0.08 : 0.12;
        const nextScale = THREE.MathUtils.lerp(
          node.scale.x,
          targetScale,
          lerpSpeed
        );

        node.scale.setScalar(nextScale);

        const planet = node.children[0];

        if (planet?.material) {
          const targetEmissive = isSelected ? 1.4 : 0.62;

          planet.material.emissiveIntensity = THREE.MathUtils.lerp(
            planet.material.emissiveIntensity,
            targetEmissive,
            0.08
          );
        }
      });

      if (
        !isDragging &&
        !reducedMotion &&
        selectedIndexRef.current === null
      ) {
        universe.rotation.y += 0.0007;
      }

      camera.lookAt(cameraTarget);
      renderer.render(scene, camera);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);

      introAnimations.forEach((animation) => {
        animation.cancel?.();
      });

      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", stopDragging);
      canvas.removeEventListener("pointercancel", stopDragging);
      canvas.removeEventListener("pointerleave", stopDragging);

      sceneStateRef.current = null;

      scene.traverse((object) => {
        object.geometry?.dispose?.();

        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        } else {
          object.material?.dispose?.();
        }
      });

      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    selectedIndexRef.current = selectedIndex;

    const sceneState = sceneStateRef.current;

    if (!sceneState) {
      return undefined;
    }

    const { camera, cameraTarget, universe, nodes } = sceneState;

    let targetPosition = DEFAULT_CAMERA_POSITION.clone();
    let targetLookAt = DEFAULT_CAMERA_TARGET.clone();

    if (selectedIndex !== null) {
      const node = nodes[selectedIndex];

      if (node) {
        universe.updateMatrixWorld(true);
        node.updateWorldMatrix(true, false);

        const worldPosition = new THREE.Vector3();
        node.getWorldPosition(worldPosition);

        const directionFromTargetToCamera = camera.position
          .clone()
          .sub(worldPosition)
          .normalize();

        if (directionFromTargetToCamera.lengthSq() === 0) {
          directionFromTargetToCamera.set(0, 0, 1);
        }

        targetPosition = worldPosition
          .clone()
          .add(
            directionFromTargetToCamera.multiplyScalar(
              CAMERA_DISTANCE_FROM_SKILL
            )
          );

        targetLookAt = worldPosition.clone();
      }
    }

    const cameraAnimation = animate(camera.position, {
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
      duration: CAMERA_ANIMATION_DURATION,
      ease: "inOutExpo",
    });

    const targetAnimation = animate(cameraTarget, {
      x: targetLookAt.x,
      y: targetLookAt.y,
      z: targetLookAt.z,
      duration: CAMERA_ANIMATION_DURATION,
      ease: "inOutExpo",
    });

    let detailAnimation;

    if (selectedIndex !== null && detailRef.current) {
      detailAnimation = animate(detailRef.current, {
        opacity: [0, 1],
        x: [35, 0],
        duration: 550,
        ease: "outExpo",
      });
    }

    return () => {
      cameraAnimation.cancel?.();
      targetAnimation.cancel?.();
      detailAnimation?.cancel?.();
    };
  }, [selectedIndex]);

  return (
    <section
      className="constellation"
      aria-labelledby="constellation-title"
    >
      <div className="constellation-copy">
        <span className="constellation-eyebrow">
          Expérience interactive
        </span>

        <h3 id="constellation-title">
          Explorez ma constellation
        </h3>

        <p>
          Survolez une planète, cliquez pour l’explorer ou glissez
          dans l’espace.
        </p>
      </div>

      <div
        className="constellation-shell"
        ref={shellRef}
      >
        <canvas
          ref={canvasRef}
          className="constellation-canvas"
          aria-label="Constellation 3D interactive de mes compétences"
        />

        <div
          className={`constellation-core-label ${
            selectedSkill ? "is-hidden" : ""
          }`}
          aria-hidden="true"
        >
          <span>NATHAN</span>
          <strong>FULL-STACK</strong>
        </div>

        {selectedSkill && (
          <aside
            ref={detailRef}
            className="constellation-detail"
            style={{
              "--skill-color": selectedSkill.cssColor,
            }}
            aria-live="polite"
          >
            <button
              type="button"
              className="constellation-detail__close"
              onClick={() => setSelectedIndex(null)}
              aria-label="Fermer le détail"
            >
              ×
            </button>

            <SelectedIcon aria-hidden="true" />

            <span>Compétence sélectionnée</span>
            <h4>{selectedSkill.name}</h4>
            <p>{selectedSkill.description}</p>
          </aside>
        )}

        <div
          className="constellation-controls"
          aria-label="Choisir une compétence"
        >
          {constellationSkills.map((skill, index) => {
            const Icon = skill.icon;

            return (
              <button
                type="button"
                className={`constellation-control ${
                  selectedIndex === index ? "is-active" : ""
                }`}
                key={skill.name}
                style={{
                  "--skill-color": skill.cssColor,
                }}
                onClick={() => setSelectedIndex(index)}
              >
                <Icon aria-hidden="true" />
                <span>{skill.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SkillConstellation;


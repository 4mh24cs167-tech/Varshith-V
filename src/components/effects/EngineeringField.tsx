import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 30;
const LINE_SEGMENTS = 120;

type AuroraRibbon = {
  line: THREE.Line;
  geometry: THREE.BufferGeometry;
  positions: Float32Array;
  speed: number;
  amplitude: number;
  yBase: number;
  opacity: number;
  color: THREE.Color;
};

type Particle = {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  size: number;
  color: THREE.Color;
  opacity: number;
};

export function EngineeringField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const ribbonsRef = useRef<AuroraRibbon[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const particleSystemRef = useRef<THREE.Points | null>(null);
  const animationRef = useRef(0);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const reduceRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    reduceRef.current = prefersReduced;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !prefersReduced,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const aspect = width / height;
    const frustumSize = 10;
    const camera = new THREE.OrthographicCamera(
      frustumSize * aspect / -2,
      frustumSize * aspect / 2,
      frustumSize / 2,
      frustumSize / -2,
      -100,
      100
    );
    camera.position.z = 50;
    cameraRef.current = camera;

    const lineGroup = new THREE.Group();
    const particleGroup = new THREE.Group();
    scene.add(lineGroup, particleGroup);

    const auroraColors = [
      { color: 0x2563EB, opacity: 0.06, yBase: -2.5, amp: 0.25, speed: 0.04 },
      { color: 0x7C3AED, opacity: 0.04, yBase: 0, amp: 0.2, speed: 0.05 },
      { color: 0x0891B2, opacity: 0.04, yBase: 2.5, amp: 0.3, speed: 0.035 },
      { color: 0x2563EB, opacity: 0.03, yBase: -1, amp: 0.15, speed: 0.06 },
      { color: 0x7C3AED, opacity: 0.025, yBase: 1.5, amp: 0.18, speed: 0.045 },
      { color: 0x0891B2, opacity: 0.025, yBase: 3.5, amp: 0.12, speed: 0.055 },
    ];

    ribbonsRef.current = auroraColors.map((config, _idx) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(LINE_SEGMENTS * 3);
      for (let i = 0; i < LINE_SEGMENTS; i++) {
        const x = (i / (LINE_SEGMENTS - 1) - 0.5) * 30;
        positions[i * 3] = x;
        positions[i * 3 + 1] = config.yBase;
        positions[i * 3 + 2] = 0;
      }
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const material = new THREE.LineBasicMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
        opacity: config.opacity,
        color: config.color,
      });

      const line = new THREE.Line(geometry, material);
      line.renderOrder = -2;
      lineGroup.add(line);

      return {
        line,
        geometry,
        positions: new Float32Array(positions),
        speed: config.speed,
        amplitude: config.amp,
        yBase: config.yBase,
        opacity: config.opacity,
        color: new THREE.Color(config.color),
      };
    });

    const particleData: Particle[] = [];
    const pPositions = new Float32Array(PARTICLE_COUNT * 3);
    const pColors = new Float32Array(PARTICLE_COUNT * 3);
    const pSizes = new Float32Array(PARTICLE_COUNT);
    const pOpacities = new Float32Array(PARTICLE_COUNT);

    const pColors2 = [
      new THREE.Color(0x2563EB),
      new THREE.Color(0x7C3AED),
      new THREE.Color(0x0891B2),
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const color = pColors2[i % 3].clone();
      const opacity = 0.03 + Math.random() * 0.06;
      const size = 0.01 + Math.random() * 0.03;
      const p: Particle = {
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 35,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.001,
          (Math.random() - 0.5) * 0.001,
          (Math.random() - 0.5) * 0.0005
        ),
        size,
        color,
        opacity,
      };
      particleData.push(p);
      pPositions[i * 3] = p.position.x;
      pPositions[i * 3 + 1] = p.position.y;
      pPositions[i * 3 + 2] = p.position.z;
      pColors[i * 3] = color.r;
      pColors[i * 3 + 1] = color.g;
      pColors[i * 3 + 2] = color.b;
      pSizes[i] = size;
      pOpacities[i] = opacity;
    }
    particlesRef.current = particleData;

    const pGeometry = new THREE.BufferGeometry();
    pGeometry.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    pGeometry.setAttribute("color", new THREE.BufferAttribute(pColors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      opacity: 0.4,
      sizeAttenuation: true,
    });

    const particleSystem = new THREE.Points(pGeometry, pMaterial);
    particleSystem.renderOrder = 0;
    particleGroup.add(particleSystem);
    particleSystemRef.current = particleSystem;

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const aspect = w / h;
      const frustumSize = 10;
      if (cameraRef.current) {
        cameraRef.current.left = frustumSize * aspect / -2;
        cameraRef.current.right = frustumSize * aspect / 2;
        cameraRef.current.top = frustumSize / 2;
        cameraRef.current.bottom = frustumSize / -2;
        cameraRef.current.updateProjectionMatrix();
      }
      if (rendererRef.current) {
        rendererRef.current.setSize(w, h);
        rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.targetY =
        (-(e.clientY - rect.top) / rect.height + 0.5) * 2;
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const animate = (timestamp: number) => {
      animationRef.current = requestAnimationFrame(animate);
      if (document.hidden) return;

      if (reduceRef.current) {
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
        return;
      }

      const delta = Math.min((timestamp - timeRef.current) / 1000, 0.05);
      timeRef.current = timestamp;
      const t = timestamp * 0.001;

      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.015;
      mouse.y += (mouse.targetY - mouse.y) * 0.015;

      ribbonsRef.current.forEach((ribbon, i) => {
        const positions = ribbon.geometry.attributes.position
          .array as Float32Array;
        for (let j = 0; j < LINE_SEGMENTS; j++) {
          const x = positions[j * 3];
          const progress = j / (LINE_SEGMENTS - 1);
          const wave1 =
            Math.sin(x * 0.5 + t * ribbon.speed * 3 + i) * ribbon.amplitude;
          const wave2 =
            Math.sin(x * 0.8 + t * ribbon.speed * 4 + i * 1.5) *
            ribbon.amplitude * 0.6;
          const y =
            ribbon.yBase + wave1 + wave2 + mouse.y * 0.3 * (1 - progress);
          positions[j * 3 + 1] = y;
          positions[j * 3 + 2] = Math.sin(t * 0.2 + x * 0.05 + i) * 0.3;
        }
        ribbon.geometry.attributes.position.needsUpdate = true;

        (ribbon.line.material as THREE.LineBasicMaterial).opacity =
          ribbon.opacity * (0.8 + Math.sin(t * 0.15 + i) * 0.2);
      });

      if (particleSystemRef.current) {
        const sys = particleSystemRef.current;
        const positions = sys.geometry.attributes.position
          .array as Float32Array;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const p = particleData[i];
          p.position.addScaledVector(p.velocity, delta * 60);
          p.position.x += Math.sin(t * 0.3 + i * 0.2) * 0.0008;
          p.position.y += Math.cos(t * 0.25 + i * 0.15) * 0.0005;

          if (p.position.y < -15) p.position.y = 15;
          if (p.position.y > 15) p.position.y = -15;
          if (p.position.x < -22) p.position.x = 22;
          if (p.position.x > 22) p.position.x = -22;

          positions[i * 3] = p.position.x;
          positions[i * 3 + 1] = p.position.y;
          positions[i * 3 + 2] = p.position.z;
        }
        sys.geometry.attributes.position.needsUpdate = true;
        sys.rotation.z = Math.sin(t * 0.03) * 0.01;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    if (reduceRef.current) {
      const staticRender = () => {
        if (
          rendererRef.current &&
          sceneRef.current &&
          cameraRef.current &&
          reduceRef.current
        ) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
        if (reduceRef.current) {
          requestAnimationFrame(staticRender);
        }
      };
      staticRender();
    } else {
      animate(performance.now());
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);

      if (rendererRef.current) {
        rendererRef.current.dispose();
        container.removeChild(rendererRef.current.domElement);
      }
      ribbonsRef.current.forEach((r) => {
        r.geometry.dispose();
        (r.line.material as THREE.Material).dispose();
      });
      if (particleSystemRef.current) {
        particleSystemRef.current.geometry.dispose();
        (particleSystemRef.current.material as THREE.Material).dispose();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="engineering-field" aria-hidden="true" />
  );
}

export default EngineeringField;

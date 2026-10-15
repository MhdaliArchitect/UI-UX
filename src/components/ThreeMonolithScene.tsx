import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeMonolithSceneProps {
  activePillarIndex: number;
  plaqueNumber: string;
  pillarName: string;
  accentColor: string;
  onSelectPillar?: () => void;
}

/**
 * Genuine Three.js (WebGL) 3D Monolith Renderer for Section 5 (00:12 in Video)
 * Optimized for 0ms Scroll Latency:
 * - Viewport-gated via IntersectionObserver (WebGL pauses when off-screen)
 * - Reads window.scrollY directly inside the WebGL loop (zero React re-renders on scroll)
 */
export const ThreeMonolithScene: React.FC<ThreeMonolithSceneProps> = ({
  activePillarIndex,
  plaqueNumber,
  pillarName,
  accentColor,
  onSelectPillar,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglFallback, setWebglFallback] = useState(false);

  const stateRef = useRef({
    activePillarIndex,
    plaqueNumber,
    pillarName,
    accentColor,
    isDragging: false,
    prevX: 0,
    userYaw: -0.38,
    targetYaw: -0.38,
  });

  useEffect(() => {
    stateRef.current.activePillarIndex = activePillarIndex;
    stateRef.current.plaqueNumber = plaqueNumber;
    stateRef.current.pillarName = pillarName;
    stateRef.current.accentColor = accentColor;
    stateRef.current.targetYaw = -0.38 + activePillarIndex * 0.45;
  }, [activePillarIndex, plaqueNumber, pillarName, accentColor]);

  const createPlaqueTexture = (numStr: string, nameStr: string, colorHex: string) => {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 512;
    const ctx = c.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#F5F3EC';
      ctx.fillRect(0, 0, 256, 512);

      ctx.strokeStyle = '#D6D3C9';
      ctx.lineWidth = 6;
      ctx.strokeRect(3, 3, 250, 506);

      ctx.fillStyle = '#27272A';
      ctx.beginPath();
      ctx.arc(36, 32, 6, 0, Math.PI * 2);
      ctx.arc(220, 32, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#18181B';
      ctx.font = '700 84px "Archivo", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(numStr, 128, 120);

      ctx.fillStyle = '#52525B';
      ctx.fillRect(48, 145, 160, 5);
      ctx.fillRect(68, 160, 120, 4);

      ctx.save();
      ctx.strokeStyle = colorHex || '#4D7C5D';
      ctx.lineWidth = 28;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(74, 355);
      ctx.lineTo(182, 235);
      ctx.stroke();

      ctx.strokeStyle = '#8FB98B';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(74, 355);
      ctx.lineTo(150, 270);
      ctx.stroke();

      ctx.fillStyle = '#18181B';
      ctx.beginPath();
      ctx.arc(182, 215, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = '#27272A';
      ctx.font = '600 18px "Space Grotesk", monospace';
      ctx.fillText(`HMOS · ${nameStr.toUpperCase()}`, 128, 435);
      ctx.fillStyle = '#71717A';
      ctx.fillRect(56, 456, 144, 5);
      ctx.fillRect(76, 470, 104, 4);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  };

  const plaqueMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  useEffect(() => {
    if (!plaqueMaterialRef.current) return;
    const newTex = createPlaqueTexture(plaqueNumber, pillarName, accentColor);
    if (plaqueMaterialRef.current.map) {
      plaqueMaterialRef.current.map.dispose();
    }
    plaqueMaterialRef.current.map = newTex;
    plaqueMaterialRef.current.needsUpdate = true;
  }, [plaqueNumber, pillarName, accentColor]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFallback(true);
      return;
    }

    const width = container.clientWidth || 340;
    const height = container.clientHeight || 380;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglFallback(true);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 7.2);
    camera.lookAt(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.35);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffdf8, 2.2);
    keyLight.position.set(-3.2, 5.5, 4.2);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 512;
    keyLight.shadow.mapSize.height = 512;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 18;
    const d = 2.6;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x93c5fd, 0.9);
    rimLight.position.set(3.5, 2.0, -3.0);
    scene.add(rimLight);

    const monolithGroup = new THREE.Group();
    scene.add(monolithGroup);

    const postMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#3A2E2B'),
      roughness: 0.72,
      metalness: 0.15,
    });

    const coreSlotMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#141210'),
      roughness: 0.9,
      metalness: 0.05,
    });

    const slatGeo = new THREE.BoxGeometry(0.18, 3.4, 0.24);
    const leftSlat = new THREE.Mesh(slatGeo, postMaterial);
    leftSlat.position.set(-0.105, 0, 0);
    leftSlat.castShadow = true;
    leftSlat.receiveShadow = true;
    monolithGroup.add(leftSlat);

    const rightSlat = new THREE.Mesh(slatGeo, postMaterial);
    rightSlat.position.set(0.105, 0, 0);
    rightSlat.castShadow = true;
    rightSlat.receiveShadow = true;
    monolithGroup.add(rightSlat);

    const boltGeo = new THREE.CylinderGeometry(0.032, 0.032, 0.44, 12);
    boltGeo.rotateZ(Math.PI / 2);
    const boltMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#141413'),
      roughness: 0.4,
      metalness: 0.7,
    });
    const upperBolt = new THREE.Mesh(boltGeo, boltMat);
    upperBolt.position.set(0, 1.38, 0);
    monolithGroup.add(upperBolt);

    const lowerBolt = new THREE.Mesh(boltGeo, boltMat);
    lowerBolt.position.set(0, 0.46, 0);
    monolithGroup.add(lowerBolt);

    const spineGeo = new THREE.BoxGeometry(0.05, 3.36, 0.18);
    const spineMesh = new THREE.Mesh(spineGeo, coreSlotMaterial);
    spineMesh.position.set(0, 0, 0);
    monolithGroup.add(spineMesh);

    const initialTex = createPlaqueTexture(
      stateRef.current.plaqueNumber,
      stateRef.current.pillarName,
      stateRef.current.accentColor
    );
    const plaqueMat = new THREE.MeshStandardMaterial({
      map: initialTex,
      roughness: 0.35,
      metalness: 0.05,
    });
    plaqueMaterialRef.current = plaqueMat;

    const plaqueGeo = new THREE.BoxGeometry(0.37, 1.24, 0.026);
    const frontPlaque = new THREE.Mesh(plaqueGeo, plaqueMat);
    frontPlaque.position.set(0, 0.92, 0.125);
    frontPlaque.castShadow = true;
    monolithGroup.add(frontPlaque);

    const backPlaque = new THREE.Mesh(plaqueGeo, plaqueMat);
    backPlaque.position.set(0, 0.92, -0.125);
    backPlaque.rotation.y = Math.PI;
    monolithGroup.add(backPlaque);

    const floorGeo = new THREE.PlaneGeometry(10, 10);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.34 });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -1.7;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    let reqId = 0;
    let isInView = false;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isInView) return;
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      const desiredYaw =
        stateRef.current.targetYaw +
        Math.sin(elapsed * 0.7) * 0.22 +
        window.scrollY * 0.0022;

      stateRef.current.userYaw += (desiredYaw - stateRef.current.userYaw) * 0.08;
      monolithGroup.rotation.y = stateRef.current.userYaw;

      renderer.render(scene, camera);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting && !isInView) {
          isInView = true;
          clock.start();
          reqId = requestAnimationFrame(animate);
        } else if (!entry.isIntersecting && isInView) {
          isInView = false;
          cancelAnimationFrame(reqId);
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(container);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 340;
      const h = container.clientHeight || 380;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      isInView = false;
      cancelAnimationFrame(reqId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.dispose();
    };
  }, []);

  if (webglFallback) {
    return (
      <div
        onClick={onSelectPillar}
        className="w-48 h-80 mx-auto flex items-center justify-center rounded-xl bg-[#27272A] text-[#FAF9F5] shadow-2xl cursor-pointer"
      >
        <span className="font-mechanik text-sm">HMOS™ {pillarName} Monolith</span>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      onClick={onSelectPillar}
      onPointerDown={(e) => {
        stateRef.current.isDragging = true;
        stateRef.current.prevX = e.clientX;
      }}
      onPointerMove={(e) => {
        if (!stateRef.current.isDragging) return;
        const dx = e.clientX - stateRef.current.prevX;
        stateRef.current.prevX = e.clientX;
        stateRef.current.targetYaw += dx * 0.012;
      }}
      onPointerUp={() => {
        stateRef.current.isDragging = false;
      }}
      onPointerLeave={() => {
        stateRef.current.isDragging = false;
      }}
      className="relative w-full max-w-[360px] h-[340px] sm:h-[380px] mx-auto cursor-grab active:cursor-grabbing select-none"
      title="Three.js WebGL 3D Monolith — Drag to rotate or click to inspect"
    />
  );
};

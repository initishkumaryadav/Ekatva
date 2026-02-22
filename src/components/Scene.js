import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function Scene() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || sceneRef.current) return;
    sceneRef.current = true;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Stars
    const starsGeo = new THREE.BufferGeometry();
    const starsPos = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      starsPos[i * 3] = (Math.random() - 0.5) * 50;
      starsPos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      starsPos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starsPos, 3));
    const stars = new THREE.Points(starsGeo, new THREE.PointsMaterial({ size: 0.02, color: '#ffffff', transparent: true, opacity: 0.4 }));
    scene.add(stars);

    // Particles
    const count = 300;
    const particlesGeo = new THREE.BufferGeometry();
    const particlesPos = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      particlesPos[i * 3] = (Math.random() - 0.5) * 20;
      particlesPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      particlesPos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlesPos, 3));
    const particles = new THREE.Points(particlesGeo, new THREE.PointsMaterial({ size: 0.04, color: '#00F0FF', transparent: true, opacity: 0.6 }));
    scene.add(particles);

    // Mandala group
    const mandalaGroup = new THREE.Group();
    scene.add(mandalaGroup);

    // Mandala rings
    const ringConfigs = [
      { radius: 1.5, segments: 6, color: '#00F0FF', opacity: 0.35 },
      { radius: 2.3, segments: 12, color: '#BD00FF', opacity: 0.3 },
      { radius: 3.1, segments: 18, color: '#00F0FF', opacity: 0.25 },
      { radius: 3.9, segments: 24, color: '#BD00FF', opacity: 0.2 },
      { radius: 4.7, segments: 30, color: '#00F0FF', opacity: 0.15 },
    ];
    ringConfigs.forEach(({ radius, segments, color, opacity }) => {
      const pts = [];
      for (let j = 0; j <= segments; j++) {
        const angle = (j / segments) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
      mandalaGroup.add(new THREE.Line(geo, mat));
    });

    // Torus knot
    const tkGeo = new THREE.TorusKnotGeometry(1.2, 0.15, 128, 16);
    const tkMat = new THREE.MeshBasicMaterial({ color: '#BD00FF', wireframe: true, transparent: true, opacity: 0.15 });
    mandalaGroup.add(new THREE.Mesh(tkGeo, tkMat));

    // Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(2, 1);
    const icoMat = new THREE.MeshBasicMaterial({ color: '#00F0FF', wireframe: true, transparent: true, opacity: 0.08 });
    mandalaGroup.add(new THREE.Mesh(icoGeo, icoMat));

    // Animation
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Stars rotation
      stars.rotation.y += 0.0002;

      // Particles movement
      const posArr = particles.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        posArr[i * 3] += velocities[i * 3];
        posArr[i * 3 + 1] += velocities[i * 3 + 1];
        posArr[i * 3 + 2] += velocities[i * 3 + 2];
        const dx = posArr[i * 3] - mouse.x * 5;
        const dy = posArr[i * 3 + 1] - mouse.y * 5;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 2) {
          posArr[i * 3] += dx * 0.02;
          posArr[i * 3 + 1] += dy * 0.02;
        }
        if (Math.abs(posArr[i * 3]) > 10) velocities[i * 3] *= -1;
        if (Math.abs(posArr[i * 3 + 1]) > 10) velocities[i * 3 + 1] *= -1;
        if (Math.abs(posArr[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Mandala rotation
      mandalaGroup.rotation.z = t * 0.1;
      mandalaGroup.rotation.x = mouse.y * 0.3;
      mandalaGroup.rotation.y = mouse.x * 0.3;

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      sceneRef.current = false;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      aria-label="Interactive 3D background with digital mandala and particle network"
    />
  );
}

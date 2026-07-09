import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight || 400;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0A1A17, 0.04); // Deep aquatic fog matching Sophisticated Dark background

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 3, 10);

    // 2. Renderer Setup
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.error("WebGL not supported:", e);
      setIsSupported(false);
      return;
    }

    // 3. Grid / Undulating Water surface
    // We create a custom mesh of points/lines representing undulating lake waves
    const geometry = new THREE.PlaneGeometry(30, 30, 40, 40);
    geometry.rotateX(-Math.PI / 2);

    // Add a vertex displacement representation
    const positionAttribute = geometry.attributes.position;
    const initialY = new Float32Array(positionAttribute.count);
    for (let i = 0; i < positionAttribute.count; i++) {
      initialY[i] = positionAttribute.getY(i);
    }

    const material = new THREE.MeshBasicMaterial({
      color: 0x1B2D2A, // Mid teal/green matching Sophisticated Dark
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const waterGrid = new THREE.Mesh(geometry, material);
    waterGrid.position.y = -2;
    scene.add(waterGrid);

    // 4. Floating 3D Bait Particles (Boilies/Pellets)
    // We create a few larger, floating, shiny spheres reacting to lights
    const baitGroup = new THREE.Group();
    scene.add(baitGroup);

    const colors = [
      0xeab308, // Subtle yellow (pineapple pop-up)
      0xe11d48, // Rose red (strawberry boilie)
      0xf97316, // Orange wafter
      0x059669, // Forest green active feed
    ];

    const spheres: {
      mesh: THREE.Mesh;
      baseY: number;
      speed: number;
      angle: number;
      rotSpeed: THREE.Vector3;
    }[] = [];

    const sphereGeo = new THREE.SphereGeometry(0.35, 16, 16);

    for (let i = 0; i < 18; i++) {
      const color = colors[i % colors.length];
      const sphereMat = new THREE.MeshPhongMaterial({
        color: color,
        shininess: 80,
        specular: 0xffffff,
        flatShading: true,
      });

      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      
      // Random scattering in 3D volume
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 5 + 1;
      const z = (Math.random() - 0.5) * 10;
      
      sphere.position.set(x, y, z);
      baitGroup.add(sphere);

      spheres.push({
        mesh: sphere,
        baseY: y,
        speed: 0.2 + Math.random() * 0.4,
        angle: Math.random() * Math.PI * 2,
        rotSpeed: new THREE.Vector3(
          Math.random() * 0.02,
          Math.random() * 0.02,
          Math.random() * 0.02
        ),
      });
    }

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0x102a2d, 1.5);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0x0284c7, 2.0); // Soft Blue sky glow
    directionalLight1.position.set(5, 10, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xf97316, 1.0); // Orange sunset hint
    directionalLight2.position.set(-5, -5, -5);
    scene.add(directionalLight2);

    // 6. Mouse Interaction & Parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (event: MouseEvent) => {
      // Normalize between -1 and 1
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // 7. Scroll Interaction
    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // 8. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height || 400;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    // 9. Animation Loop
    const clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Undulate Water plane
      const positions = geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const xVal = positions.getX(i);
        const zVal = positions.getZ(i);

        // Calculate wave height using multiple sin/cos components
        const wave1 = Math.sin(xVal * 0.4 + elapsedTime * 1.5) * 0.35;
        const wave2 = Math.cos(zVal * 0.3 + elapsedTime * 1.2) * 0.35;
        const wave3 = Math.sin((xVal + zVal) * 0.2 + elapsedTime * 0.8) * 0.2;

        positions.setY(i, initialY[i] + wave1 + wave2 + wave3);
      }
      positions.needsUpdate = true;

      // Animate floating bait spheres (slow floating up and down bobbing)
      spheres.forEach((sphere) => {
        sphere.angle += 0.01 * sphere.speed;
        
        // Bobbing vertical motion
        sphere.mesh.position.y = sphere.baseY + Math.sin(sphere.angle) * 0.6;
        
        // Drift rotate
        sphere.mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), sphere.rotSpeed.x);
        sphere.mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), sphere.rotSpeed.y);

        // Scroll influence (gently spin bait particles proportional to page scroll)
        sphere.mesh.rotation.y += scrollY * 0.0005;
      });

      // Ambient cluster rotation
      baitGroup.rotation.y = elapsedTime * 0.04;

      // Smooth mouse camera follow
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      camera.position.x = mouse.x * 2.5;
      camera.position.y = 3 + mouse.y * 1.5 + (scrollY * 0.002);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      spheres.forEach((s) => {
        s.mesh.geometry.dispose();
        if (Array.isArray(s.mesh.material)) {
          s.mesh.material.forEach((m) => m.dispose());
        } else {
          s.mesh.material.dispose();
        }
      });
    };
  }, []);

  if (!isSupported) {
    return (
      <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center text-emerald-400 font-mono text-xs">
        [3D Interactive Lake Simulation - Static Mode Active]
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none opacity-80"
      id="three-canvas-container"
      style={{ zIndex: 0 }}
    />
  );
}

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const LightBulbAnimation = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffd900, 1, 100);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // Light Bulb Geometry
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xffd900 });
    const lightBulb = new THREE.Mesh(geometry, material);
    scene.add(lightBulb);

    // Camera Position
    camera.position.z = 5;

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth rotation
      lightBulb.rotation.x += 0.01;
      lightBulb.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default LightBulbAnimation;

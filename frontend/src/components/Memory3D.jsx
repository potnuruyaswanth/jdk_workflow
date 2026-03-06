import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Memory3D({ stackData = [], heapData = [] }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    sceneRef.current = scene;

    // Setup Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(10, 10, 10);
    cameraRef.current = camera;

    // Setup Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Stack Area (Purple Tower)
    const stackGeometry = new THREE.BoxGeometry(3, 8, 3);
    const stackMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x9333ea, 
      transparent: true, 
      opacity: 0.3 
    });
    const stackMesh = new THREE.Mesh(stackGeometry, stackMaterial);
    stackMesh.position.set(-5, 4, 0);
    scene.add(stackMesh);

    // Stack Label
    const stackLabel = createTextSprite('Stack', 0x9333ea);
    stackLabel.position.set(-5, 9, 0);
    scene.add(stackLabel);

    // Heap Area (Orange Sphere)
    const heapGeometry = new THREE.SphereGeometry(4, 32, 32);
    const heapMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xf97316, 
      transparent: true, 
      opacity: 0.3,
      wireframe: true
    });
    const heapMesh = new THREE.Mesh(heapGeometry, heapMaterial);
    heapMesh.position.set(5, 4, 0);
    scene.add(heapMesh);

    // Heap Label
    const heapLabel = createTextSprite('Heap', 0xf97316);
    heapLabel.position.set(5, 9, 0);
    scene.add(heapLabel);

    // Method Area (Blue Plane)
    const methodGeometry = new THREE.BoxGeometry(8, 0.5, 8);
    const methodMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x3b82f6, 
      transparent: true, 
      opacity: 0.5 
    });
    const methodMesh = new THREE.Mesh(methodGeometry, methodMaterial);
    methodMesh.position.set(0, -1, 0);
    scene.add(methodMesh);

    // Method Area Label
    const methodLabel = createTextSprite('Method Area', 0x3b82f6);
    methodLabel.position.set(0, -2, 0);
    scene.add(methodLabel);

    // Grid Helper
    const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update visualization based on data
  useEffect(() => {
    if (!sceneRef.current) return;

    // Remove old stack frames
    const oldStackFrames = sceneRef.current.children.filter(
      child => child.userData.type === 'stackFrame'
    );
    oldStackFrames.forEach(frame => sceneRef.current.remove(frame));

    // Add new stack frames
    stackData.forEach((frame, index) => {
      const frameGeometry = new THREE.BoxGeometry(2.5, 0.8, 2.5);
      const frameMaterial = new THREE.MeshPhongMaterial({ color: 0xa855f7 });
      const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
      frameMesh.position.set(-5, index + 0.5, 0);
      frameMesh.userData.type = 'stackFrame';
      sceneRef.current.add(frameMesh);
    });

    // Remove old heap objects
    const oldHeapObjects = sceneRef.current.children.filter(
      child => child.userData.type === 'heapObject'
    );
    oldHeapObjects.forEach(obj => sceneRef.current.remove(obj));

    // Add new heap objects
    heapData.forEach((obj, index) => {
      const angle = (index / heapData.length) * Math.PI * 2;
      const radius = 2;
      const objGeometry = new THREE.SphereGeometry(0.5, 16, 16);
      const objMaterial = new THREE.MeshPhongMaterial({ color: 0xfb923c });
      const objMesh = new THREE.Mesh(objGeometry, objMaterial);
      objMesh.position.set(
        5 + Math.cos(angle) * radius,
        4 + (Math.random() - 0.5) * 2,
        Math.sin(angle) * radius
      );
      objMesh.userData.type = 'heapObject';
      sceneRef.current.add(objMesh);
    });
  }, [stackData, heapData]);

  // Helper function to create text sprites
  function createTextSprite(text, color) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 64;
    
    context.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
    context.font = 'Bold 32px Arial';
    context.textAlign = 'center';
    context.fillText(text, 128, 40);
    
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(4, 1, 1);
    
    return sprite;
  }

  return (
    <div className="devtools-panel h-full flex flex-col">
      <div className="devtools-header">🧊 3D Memory Visualization</div>
      <div className="flex-1 relative">
        <div ref={containerRef} className="w-full h-full" />
        <div className="absolute top-4 right-4 bg-jvm-dark bg-opacity-90 p-3 rounded text-xs">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span>Stack: {stackData.length} frames</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>Heap: {heapData.length} objects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Method Area</span>
          </div>
        </div>
      </div>
    </div>
  );
}

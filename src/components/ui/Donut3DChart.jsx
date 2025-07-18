import React, { useRef, useEffect, useState } from 'react';

const Donut3DChart = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [threeLoaded, setThreeLoaded] = useState(false);

  const data = {
    labels: ['10%', '20%', '15%', '25%', '30%'],
    values: [10, 20, 15, 25, 30],
    colors: ['#1b3a4b', '#004e64', '#00a5cf', '#9fffcb', '#d3ffe9']
  };

  useEffect(() => {
    if (!mountRef.current || threeLoaded) return;

    // Load Three.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => {
      setThreeLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [threeLoaded]);

  useEffect(() => {
    if (!threeLoaded || !mountRef.current) return;

    const THREE = window.THREE;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Create donut segments
    const segments = [];
    const total = data.values.reduce((sum, val) => sum + val, 0);
    let currentAngle = 0;
    const innerRadius = 1;
    const outerRadius = 2;
    const height = 0.5;

    data.values.forEach((value, index) => {
      const segmentAngle = (value / total) * Math.PI * 2;
      
      // Create shape for extrusion
      const shape = new THREE.Shape();
      
      // Start from inner radius at current angle
      shape.moveTo(
        Math.cos(currentAngle) * innerRadius,
        Math.sin(currentAngle) * innerRadius
      );
      
      // Outer arc
      for (let i = 0; i <= 32; i++) {
        const angle = currentAngle + (i / 32) * segmentAngle;
        shape.lineTo(
          Math.cos(angle) * outerRadius,
          Math.sin(angle) * outerRadius
        );
      }
      
      // Inner arc (reverse)
      for (let i = 32; i >= 0; i--) {
        const angle = currentAngle + (i / 32) * segmentAngle;
        shape.lineTo(
          Math.cos(angle) * innerRadius,
          Math.sin(angle) * innerRadius
        );
      }

      const extrudeSettings = {
        depth: height,
        bevelEnabled: false,
        steps: 1
      };
      
      const extrudeGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      
      const material = new THREE.MeshPhongMaterial({
        color: data.colors[index],
        shininess: 100,
        transparent: true,
        opacity: 0.9
      });

      const segment = new THREE.Mesh(extrudeGeometry, material);
      segment.position.z = -height / 2;
      segment.castShadow = true;
      segment.receiveShadow = true;
      segment.userData = { index, label: data.labels[index], value: value };
      
      scene.add(segment);
      segments.push(segment);
      
      currentAngle += segmentAngle;
    });

    // Mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(segments);

      // Reset all segments
      segments.forEach(segment => {
        segment.position.z = -height / 2;
        segment.material.opacity = 0.9;
      });

      if (intersects.length > 0) {
        const intersectedSegment = intersects[0].object;
        intersectedSegment.position.z = 0; // Lift segment
        intersectedSegment.material.opacity = 1;
        setHoveredSegment(intersectedSegment.userData);
        renderer.domElement.style.cursor = 'pointer';
      } else {
        setHoveredSegment(null);
        renderer.domElement.style.cursor = 'default';
      }
    };

    renderer.domElement.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      
      // Dispose geometries and materials
      segments.forEach(segment => {
        segment.geometry.dispose();
        segment.material.dispose();
      });
    };
  }, [threeLoaded]);

  return (
    <div className="w-full h-screen bg-transparent relative">
      <div ref={mountRef} className="w-full h-full" />
      
      {/* Legend */}
      <div className="absolute top-4 right-4 bg-transparent p-4 rounded-lg shadow-lg">
        <h3 className="font-bold text-gray-800 mb-2">Répartition</h3>
        {data.labels.map((label, index) => (
          <div key={index} className="flex items-center mb-1">
            <div
              className="w-4 h-4 rounded mr-2"
              style={{ backgroundColor: data.colors[index] }}
            />
            <span className="text-sm text-gray-600">{label}</span>
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {hoveredSegment && (
        <div className="absolute top-4 left-4 bg-black text-white p-3 rounded shadow-lg">
          <div className="font-semibold">{hoveredSegment.label}</div>
          <div className="text-sm">Valeur: {hoveredSegment.value}</div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-sm text-gray-600 bg-white p-2 rounded shadow">
        Survolez les segments pour les mettre en évidence
      </div>
    </div>
  );
};

export default Donut3DChart;
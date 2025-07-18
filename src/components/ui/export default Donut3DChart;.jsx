import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'; // Import correct

const Donut3DChart = () => {
  const mountRef = useRef(null);
  const [hoveredSegment, setHoveredSegment] = useState(null);

  const data = {
    labels: ['Catégorie A', 'Catégorie B', 'Catégorie C', 'Catégorie D', 'Catégorie E'],
    values: [10, 20, 15, 25, 30],
    colors: ['#1b3a4b', '#004e64', '#00a5cf', '#9fffcb', '#d3ffe9']
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);

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
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create donut segments
    const segments = [];
    const total = data.values.reduce((sum, val) => sum + val, 0);
    let currentAngle = 0;
    const innerRadius = 1;
    const outerRadius = 2;
    const height = 0.5;

    // Solution alternative si vous ne voulez pas utiliser FontLoader
    const createDonutWithoutText = () => {
      data.values.forEach((value, index) => {
        const segmentAngle = (value / total) * Math.PI * 2;
        
        const geometry = new THREE.RingGeometry(
          innerRadius,
          outerRadius,
          32,
          1,
          currentAngle,
          segmentAngle
        );

        const extrudeSettings = {
          depth: height,
          bevelEnabled: true,
          bevelSize: 0.02,
          bevelThickness: 0.02
        };

        const shape = new THREE.Shape();
        const points = [];
        
        // Create shape (comme dans votre code original)
        // ... (votre code existant pour créer la forme)

        

        const extrudeGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        
        const material = new THREE.MeshPhongMaterial({
          color: data.colors[index],
          transparent: true,
          opacity: 0.9
        });

        const segment = new THREE.Mesh(extrudeGeometry, material);
        segment.position.z = -height / 2;
        segment.userData = { 
          index, 
          label: data.labels[index], 
          value: value,
          percentage: Math.round((value / total) * 100) + '%'
        };
        
        scene.add(segment);
        segments.push(segment);
        currentAngle += segmentAngle;
      });
    };

    // Solution avec FontLoader (nécessite le fichier de police)
    const createDonutWithText = async () => {
      const fontLoader = new FontLoader();
      
      try {
        // Chargez la police depuis un fichier ou une URL
        const font = await new Promise((resolve, reject) => {
          fontLoader.load(
            'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
            resolve,
            undefined,
            reject
          );
        });

        data.values.forEach((value, index) => {
          const segmentAngle = (value / total) * Math.PI * 2;
          const middleAngle = currentAngle + segmentAngle / 2;
          
          // ... (votre code existant pour créer le segment)

          // Créez le texte seulement si la police est chargée
          const textGeometry = new THREE.TextGeometry(
            Math.round((value / total) * 100) + '%',
            {
              font: font,
              size: 0.2,
              height: 0.02
            }
          );
          
          const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
          const textMesh = new THREE.Mesh(textGeometry, textMaterial);
          
          // Positionnez le texte
          const textRadius = (innerRadius + outerRadius) / 2;
          textMesh.position.set(
            Math.cos(middleAngle) * textRadius,
            Math.sin(middleAngle) * textRadius,
            height / 2 + 0.01
          );
          
          scene.add(textMesh);
        });
      } catch (error) {
        console.error("Erreur de chargement de la police:", error);
        createDonutWithoutText();
      }
    };

    // Choisissez une méthode
    createDonutWithText(); // Utilisez celle-ci si vous voulez du texte
    // OU
    // createDonutWithoutText(); // Utilisez celle-ci comme solution de repli

    // ... (le reste de votre code pour les interactions et l'animation)

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-gray-50 relative">
      <div ref={mountRef} className="w-full h-full" />
      
      {/* Affichez les pourcentages dans la légende si le texte 3D ne fonctionne pas */}
      <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg">
        <h3 className="font-bold text-gray-800 mb-2">Légende</h3>
        {data.labels.map((label, index) => (
          <div key={index} className="flex items-center mb-1">
            <div
              className="w-4 h-4 rounded mr-2"
              style={{ backgroundColor: data.colors[index] }}
            />
            <span className="text-sm text-gray-600">
              {label} ({Math.round((data.values[index] / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Donut3DChart;
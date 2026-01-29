import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  varying float vElevation;
  uniform float uTime;

  void main() {
    vUv = uv;
    
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Gentle floating waves
    float elevation = sin(modelPosition.x * 0.2 + uTime * 0.2) * 0.3
                    + sin(modelPosition.y * 0.2 + uTime * 0.2) * 0.3;
                    
    // Add some noise/irregularity
    elevation += sin(modelPosition.x * 0.8 + uTime * 0.1) * 0.05;
    elevation += sin(modelPosition.y * 0.8 + uTime * 0.1) * 0.05;

    modelPosition.z += elevation; 
    vElevation = elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
  }
`;

const fragmentShader = `
  uniform vec3 uDepthColor;
  uniform vec3 uSurfaceColor;
  uniform float uColorOffset;
  uniform float uColorMultiplier;
  
  varying float vElevation;

  void main() {
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const Ocean = () => {
  const mesh = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDepthColor: { value: new THREE.Color("#1e293b") }, // Deep slate blue/grey
      uSurfaceColor: { value: new THREE.Color("#64748b") }, // Lighter cool grey
      uColorOffset: { value: 0.2 },
      uColorMultiplier: { value: 1.5 },
    }),
    [],
  );

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 3, 0, 0]} // Tilted for perspective
      scale={1.5}
    >
      <planeGeometry args={[20, 10, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
        transparent={true}
      />
    </mesh>
  );
};

const OceanBackground = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        background: "linear-gradient(to bottom, #0f172a, #1e293b)", // Fallback & Blend
      }}
    >
      <Canvas camera={{ position: [0, 2, 4], fov: 75 }}>
        <Ocean />
        <fog attach="fog" args={["#0f172a", 0, 10]} /> {/* Atmospheric fog */}
      </Canvas>
    </div>
  );
};

export default OceanBackground;

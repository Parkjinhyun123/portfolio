import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import * as THREE from "three";

const ThreeTextComponent = () => {
  function Model({ objUrl, mtlUrl }) {
    const modelRef = useRef();
    const materials = useLoader(MTLLoader, mtlUrl);
    const obj = useLoader(OBJLoader, objUrl, (loader) => {
      materials.preload();
      loader.setMaterials(materials);
    });

    useEffect(() => {
      if (modelRef.current) {
        modelRef.current.scale.set(0.02, 0.02, 0.02);
        modelRef.current.position.set(-1.3, -1, 0);
      }
    }, []);

    // 모델 회전
    useFrame((state, delta) => {
      if (modelRef.current) {
        // 10초에 360도 회전을 위한 계산
        const rotationPerSecond = (2 * Math.PI) / 20;
        modelRef.current.rotation.y += rotationPerSecond * delta;
      }
    });

    return <primitive object={obj} ref={modelRef} />;
  }

  return (
    <Canvas
      style={{
        width: "100%",
        height: "500px",
      }}
    >
      <ambientLight intensity={5} />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} />
      <pointLight position={[-10, -10, -10]} intensity={5} />
      <Suspense fallback={null}>
        <Model objUrl="/Project Name.obj" mtlUrl="/Project Name.mtl" />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeTextComponent;

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import * as THREE from "three";
import { sRGBEncoding } from "@react-three/drei/helpers/deprecated";

const ThreeTextComponent = () => {
  // 화면의 너비를 상태로 관리
  const [width, setWidth] = useState(window.innerWidth);

  function Model({ objUrl, mtlUrl }) {
    const modelRef = useRef();
    const materials = useLoader(MTLLoader, mtlUrl);
    const obj = useLoader(OBJLoader, objUrl, (loader) => {
      materials.preload();
      loader.setMaterials(materials);
    });
    useEffect(() => {
      if (modelRef.current) {
        // 화면 너비에 따라 모델의 스케일 조정
        const scale = width <= 764 ? 0.01 : 0.02;
        modelRef.current.scale.set(scale, scale, scale);

        // 화면 너비에 따라 모델의 위치 조정
        // 예를 들어, 화면 너비가 764px 이하일 경우, 모델을 화면 중앙으로 이동
        const positionX = width <= 764 ? 0 : -1.3; // 화면 너비에 따라 X 위치 조정
        const positionY = width <= 764 ? 0 : -1; // 화면 너비에 따라 Y 위치 조정
        // Z 위치는 필요에 따라 조정할 수 있습니다.
        modelRef.current.position.set(positionX, positionY, 0);
      }
    }, [width]); // 화면 너비가 변경될 때마다 이펙트를 다시 실행

    useEffect(() => {
      modelRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xe92934,
            metalness: 0.1,
            roughness: 0.1,
          });
        }
      });
    }, [obj]);

    useFrame((state, delta) => {
      if (modelRef.current) {
        const rotationPerSecond = (2 * Math.PI) / 20;
        modelRef.current.rotation.y += rotationPerSecond * delta;
      }
    });

    return <primitive object={obj} ref={modelRef} />;
  }

  useEffect(() => {
    // 화면 크기가 변경될 때 너비를 업데이트하는 이벤트 리스너
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Canvas
      gl={{ antialias: true, outputEncoding: sRGBEncoding }}
      style={{
        width: "100%",
        height: "500px",
      }}
    >
      <ambientLight intensity={3} />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} />
      <pointLight position={[-10, -10, -10]} intensity={3} />
      <Suspense fallback={null}>
        <Model objUrl="/Project Name.obj" mtlUrl="/Project Name.mtl" />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeTextComponent;

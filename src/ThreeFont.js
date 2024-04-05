import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Effects } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { MeshStandardMaterial } from "three"; // MeshStandardMaterial import 추가
import { sRGBEncoding } from "@react-three/drei/helpers/deprecated";

const ThreeTextComponent = () => {
  const [width, setWidth] = useState(window.innerWidth);

  function Model({ glbUrl }) {
    const modelRef = useRef();
    const { scene } = useGLTF(glbUrl); // .glb 파일 로드

    // 모델 크기 및 위치 조정
    useEffect(() => {
      if (modelRef.current) {
        const scale = width <= 764 ? 0.01 : 0.02;
        modelRef.current.scale.set(scale, scale, scale);
        const positionX = width <= 764 ? 0 : -1;
        const positionY = width <= 764 ? 0 : -2;
        modelRef.current.position.set(positionX, positionY, 0);
      }
    }, [width]);

    // 모델 회전
    useFrame((state, delta) => {
      if (modelRef.current) {
        const rotationPerSecond = (2 * Math.PI) / 20; // 20초에 한 바퀴 회전
        modelRef.current.rotation.y += rotationPerSecond * delta;
      }
    });

    // Chrome Satin 재질로 변경
    useEffect(() => {
      modelRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material = new MeshStandardMaterial({
            color: 0xe82a33, // Chrome은 일반적으로 밝은 색을 가집니다.
            metalness: 0.9, // 높은 금속성을 가집니다.
            roughness: 0.2, // 낮은 거칠기를 가집니다. Satin 마감은 약간의 거칠기가 있기 때문에 0에 가깝지만 완전히 0은 아닙니다.
            envMapIntensity: 1.5, // 환경 맵의 강도를 조정하여 반사 효과를 강조합니다. (환경 맵 사용하지 않을 경우 이 속성은 무시됩니다)
          });
        }
      });
    }, [glbUrl]); // glbUrl이 변경될 때마다 실행

    return <primitive object={scene} ref={modelRef} />;
  }

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Canvas
      gl={{
        antialias: true,
        outputEncoding: sRGBEncoding,
      }}
      style={{
        width: "100%",
        height: "500px",
      }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[-1, 1, 5]} intensity={4} />
      <pointLight position={[-10, -5, -10]} intensity={2} color={"#ffffff"} />
      <Suspense fallback={null}>
        <Model glbUrl="/Project Name.glb" />
      </Suspense>
      <OrbitControls />
      <Effects>
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>
      </Effects>
    </Canvas>
  );
};

export default ThreeTextComponent;

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

const ThreeTextComponent = () => {
  const mountRef = useRef(null);
  const introRef = useRef(null);

  useEffect(() => {
    let camera, scene, renderer;

    function init() {
      camera = new THREE.PerspectiveCamera(45, 3000 / 1000, 1, 10000);
      camera.position.set(0, 0, 600);

      scene = new THREE.Scene();
      scene.background = null;

      const loader = new FontLoader();
      loader.load("fonts/Do Hyeon_Regular.json", function (font) {
        const color = new THREE.Color(0xffffff);

        const matDark = new THREE.MeshBasicMaterial({
          color: color,
          side: THREE.DoubleSide,
        });

        const matLite = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.4,
          side: THREE.DoubleSide,
        });

        const message = "   사람을 생각하는 \n 개발자 박진현 입니다.\n";

        const shapes = font.generateShapes(message, 80);

        const geometry = new THREE.ShapeGeometry(shapes);

        geometry.computeBoundingBox();

        const xMid =
          -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

        geometry.translate(xMid, 0, 0);

        const text = new THREE.Mesh(geometry, matLite);
        text.position.z = -150;
        scene.add(text);

        const holeShapes = [];
        for (let i = 0; i < shapes.length; i++) {
          const shape = shapes[i];
          if (shape.holes && shape.holes.length > 0) {
            for (let j = 0; j < shape.holes.length; j++) {
              const hole = shape.holes[j];
              holeShapes.push(hole);
            }
          }
        }

        shapes.push.apply(shapes, holeShapes);

        const style = SVGLoader.getStrokeStyle(5, color.getStyle());

        const strokeText = new THREE.Group();

        for (let i = 0; i < shapes.length; i++) {
          const shape = shapes[i];

          const points = shape.getPoints();

          const geometry = SVGLoader.pointsToStroke(points, style);

          geometry.translate(xMid, 0, 0);

          const strokeMesh = new THREE.Mesh(geometry, matDark);
          strokeText.add(strokeMesh);
        }

        scene.add(strokeText);
      });

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(2500, 400);
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 0, 0);
      controls.update();

      window.addEventListener("resize", onWindowResize, false);

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }

      animate();
    }

    init();

    const handleMouseMove = (e) => {
      if (introRef.current) {
        const { top, height } = introRef.current.getBoundingClientRect();
        const y = e.clientY - top;
        const yPercent = (y / height) * 100;
        introRef.current.style.backgroundPosition = `center ${100 - yPercent}%`;
      }
    };

    const handleMouseLeave = () => {
      if (introRef.current) {
        introRef.current.style.backgroundPosition = "center 100%";
      }
    };

    if (introRef.current) {
      introRef.current.addEventListener("mousemove", handleMouseMove);
      introRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (introRef.current) {
        introRef.current.removeEventListener("mousemove", handleMouseMove);
        introRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return <div ref={mountRef} />;
};

export default ThreeTextComponent;

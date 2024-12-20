import React, { useRef } from "react";
import "./Banner.css";
import ThreeTextComponent from "./ThreeFont";

function Banner() {
  const introRef = useRef(null);

  const handleMouseMove = (e) => {
    const { top, height } = introRef.current.getBoundingClientRect();
    const y = e.clientY - top;
    const yPercent = (y / height) * 100;
    introRef.current.style.backgroundPosition = `center ${100 - yPercent}%`;
  };

  const handleMouseLeave = () => {
    introRef.current.style.backgroundPosition = "center 100%";
  };

  return (
    <div
      className="BannerContainer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="Intro-container">
        {/* ThreeTextComponent를 배경처럼 겹쳐서 보이게 합니다. */}
        <ThreeTextComponent
          className="ThreeTextBackground"
        />
        <div className="Intro" ref={introRef}>
          사람을 위해 개발하는
          <br />
          프론트엔드 개발자
        </div>
        <div className="About-me">
          사람이 어떻게하면 더 편한 생활을 누릴지
          <br /> 고민하며 공부하는 개발자
          <br />
          박진현입니다.
        </div>
      </div>
    </div>
  );
}

export default Banner;

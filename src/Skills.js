import React, { useEffect, useRef } from "react";
import FrontImg from "./img/front.png";
import BackImg from "./img/back.png";
import GitImg from "./img/Version Control.png";
import FigmaImg from "./img/Communication.png";
import "./Skills.css";

function Skills() {
  const cardRefs = useRef([]);

  // 이미지 로드 후 각 카드의 높이를 조절하는 함수
  const adjustCardHeight = () => {
    cardRefs.current.forEach((card) => {
      // 카드 내 이미지의 높이를 가져옵니다.
      const imgHeight = card.querySelector("img").clientHeight;
      // 이미지 높이에 따라 카드의 높이를 조절합니다.
      card.style.height = `${imgHeight}px`;
    });
  };

  useEffect(() => {
    // 모든 이미지가 로드될 때까지 기다린 후, 카드 높이를 조절합니다.
    const images = cardRefs.current.map((card) => card.querySelector("img"));
    const loadedImages = images.map((img) => {
      return new Promise((resolve) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = resolve;
        }
      });
    });

    Promise.all(loadedImages).then(adjustCardHeight);
  }, []);

  return (
    <div className="Skill-container">
      <div className="Skill-card-container">
        {[
          { name: "Front End", img: FrontImg },
          { name: "Backend", img: BackImg },
          { name: "Version Control", img: GitImg },
          { name: "Communication", img: FigmaImg },
        ].map((skill, index) => (
          <div
            ref={(el) => (cardRefs.current[index] = el)}
            className="Skill-card"
            key={skill.name}
          >
            <div className="Skill-name">{skill.name}</div>
            <img src={skill.img} alt={`${skill.name} 스킬`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;

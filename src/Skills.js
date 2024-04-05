import React, { useEffect, useRef } from "react";
import FrontImg from "./img/front.png";
import BackImg from "./img/back.png";
import GitImg from "./img/Version Control.png";
import FigmaImg from "./img/Communication.png";
import DeployImg from "./img/Deploy.png";
import "./Skills.css";

function Skills() {
  const cardRefs = useRef([]);

  const adjustCardHeight = () => {
    cardRefs.current.forEach((card) => {
      const imgHeight = card.querySelector("img").clientHeight;
      card.style.height = `${imgHeight}px`;
    });
  };

  useEffect(() => {
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
      <div className="About-head">Skills</div>
      <div className="Skill-card-container">
        {[
          { name: "Front End", img: FrontImg },
          { name: "Database", img: BackImg },
          { name: "Version Control", img: GitImg },
          { name: "Design", img: FigmaImg },
          { name: "Deploy", img: DeployImg },
        ].map((skill, index) => (
          <div
            ref={(el) => (cardRefs.current[index] = el)}
            className="Skill-card"
            key={skill.name}
          >
            <h3 className="Skill-name">{skill.name}</h3>
            <img src={skill.img} alt={`${skill.name} 스킬`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;

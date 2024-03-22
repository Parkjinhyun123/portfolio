import React, { useEffect, useRef } from "react";
import FrontImg from "./img/front.png";
import BackImg from "./img/back.png";
import GitImg from "./img/Version Control.png";
import FigmaImg from "./img/Communication.png";
import "./Skills.css";

function Skills() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const adjustCardHeight = () => {
      cardRefs.current.forEach((card) => {
        if (card && card.querySelector("img")) {
          const img = card.querySelector("img");
          if (img.complete) {
            card.style.height = `${img.offsetHeight}px`;
          } else {
            img.addEventListener("load", () => {
              card.style.height = `${img.offsetHeight}px`;
            });
          }
        }
      });
    };

    adjustCardHeight();
    window.addEventListener("resize", adjustCardHeight);

    return () => {
      window.removeEventListener("resize", adjustCardHeight);
    };
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
            <img src={skill.img} alt={`${skill.name}스킬`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;

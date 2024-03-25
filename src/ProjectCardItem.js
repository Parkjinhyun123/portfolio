import React, { useRef, useState } from "react";
import styled from "styled-components";

const hoverEasing = "cubic-bezier(0.23, 1, 0.32, 1)";
const returnEasing = "cubic-bezier(0.445, 0.05, 0.55, 0.95)";

const HiddenContent = styled.div`
  position: absolute;
  bottom: ${(props) => (props.$hover ? "0" : "-100%")};
  left: 0;
  padding: 4px 8px 8px 10px;
  width: 100%;
  transition: bottom 0.5s
    ${(props) => (props.$hover ? hoverEasing : returnEasing)};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1024px) {
    bottom: initial;
    transition: none;
    position: static;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: ${(props) => (props.$hover ? "400px" : "300px")};
  box-shadow: 3px 8px 8px rgba(155, 155, 155, 0.5);
  padding: 16px;
  border-radius: 16px;
  background-color: #fff;
  margin: 0 30px;
  justify-content: space-between;
  cursor: pointer;
  transform: translateX(-50%);
  transform-style: preserve-3d;
  overflow: hidden;
  position: relative;
  transition: transform 0.2s ${returnEasing}, box-shadow 2s ${hoverEasing},
    height 0.3s ease-in-out;

  &:hover {
    box-shadow: 5px 15px 15px rgba(155, 155, 155, 0.6);
  }
  &:hover ${HiddenContent} {
    bottom: 0;
  }
  @media (max-width: 1024px) {
    height: auto;
  }
`;

const VisibleContent = styled.div`
  transition: transform 0.5s;
`;

function ProjectCardItem({ project, onClick }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const [hover, setHover] = useState(false);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      cardRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    const rotateX = (y / height) * 60;
    const rotateY = (x / width) * -60;

    setRotation({ x: rotateX, y: rotateY });
  };

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
    setHover(false);
  };

  return (
    <Card
      ref={cardRef}
      className="ProjectCard"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={resetRotation}
      onMouseMove={handleMouseMove}
      $hover={hover}
      style={{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
    >
      <VisibleContent>
        <div className="CardImg">
          <img src={project.img} alt={project?.Title} />
        </div>
        <div className="Card-title">
          <h3>{project?.Title}</h3>
          <div>{project?.Member}</div>
        </div>
      </VisibleContent>
      <HiddenContent $hover={hover}>
        <div className="Card-intro">{project?.Intro}</div>
        <div className="Stacks">Stack</div>
        <div>{project?.Skills}</div>
      </HiddenContent>
    </Card>
  );
}

export default ProjectCardItem;

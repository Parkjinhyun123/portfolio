import ProjectCard from "./ProjectCard";
import "./Project.css";

function Project() {
  return (
    <div className="ProjectCard-container">
      <div className="introduce">클릭시 모달이 열립니다!</div>
      <div className="ProjectCard-content">
        <ProjectCard />
      </div>
    </div>
  );
}

export default Project;

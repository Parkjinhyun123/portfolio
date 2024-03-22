import { useEffect, useState } from "react";
import { getProjects } from "./api/firebase";
import "./ProjectCard.css";

function ProjectCard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProjects();
      setProjects(data);
    };
    fetchData();
  }, []);

  return (
    <>
      {projects.map((project, index) => (
        <div key={index} className="ProjectCard">
          <div className="CardImg">
            <img src={project.img} alt={project.Title} />
          </div>
          <div className="Card-title">
            <h3>{project.Title}</h3>
            <div>{project.Member}</div>
          </div>
          <div className="Card-intro">{project.Intro}</div>
          <div>{project.Skills}</div>
        </div>
      ))}
    </>
  );
}

export default ProjectCard;

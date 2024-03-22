import { useEffect, useState } from "react";
import { getProjects } from "./api/firebase";
import "./ProjectCard.css";
import Modal from "./Modal";

function ProjectCard() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let data = await getProjects();
      data.sort((a, b) => a.id - b.id);
      setProjects(data);
    };
    fetchData();
  }, []);

  const toggleModal = (project) => {
    setIsModalOpen(!isModalOpen);
    setSelectedProject(isModalOpen ? null : project);
  };

  return (
    <>
      {projects.map((project) => (
        <div
          key={project.id}
          className="ProjectCard"
          onClick={() => toggleModal(project)}
        >
          <div className="CardImg">
            <img src={project.img} alt={project.Title} />
          </div>
          <div className="Card-title">
            <h3>{project.Title}</h3>
            <div>{project.Member}</div>
          </div>
          <div className="Card-intro">{project.Intro}</div>
          <div className="Stacks">Stack</div>
          <div>{project.Skills}</div>
        </div>
      ))}
      <Modal
        isOpen={isModalOpen}
        onClose={() => toggleModal(null)}
        project={selectedProject}
      />
    </>
  );
}

export default ProjectCard;

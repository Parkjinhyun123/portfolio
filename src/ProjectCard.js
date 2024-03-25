import { useEffect, useState } from "react";
import { getProjects } from "./api/firebase";
import "./ProjectCard.css";
import Modal from "./Modal";
import ProjectCardItem from "./ProjectCardItem";
import classNames from "classnames";

function ProjectCard() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let data = await getProjects();
      data.sort((a, b) => a.id - b.id);
      setProjects(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        setIsActive(true);
      }, 100);
    } else {
      setIsActive(false);
    }
  }, [isModalOpen]);

  const toggleModal = (project) => {
    if (!isModalOpen) {
      setSelectedProject(project);
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
      setTimeout(() => {
        setSelectedProject(null);
      }, 100);
    }
  };

  return (
    <>
      {projects.map((project) => (
        <ProjectCardItem
          key={project.id}
          project={project}
          onClick={() => toggleModal(project)}
        />
      ))}
      <div
        className={classNames("Modal-overlay", { active: isActive })}
        style={{ display: isModalOpen ? "flex" : "none" }}
      >
        <Modal
          isOpen={isModalOpen}
          onClose={() => toggleModal(null)}
          project={selectedProject}
        />
      </div>
    </>
  );
}

export default ProjectCard;

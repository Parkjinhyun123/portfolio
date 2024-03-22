import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import "./Project.css";

function Project() {
  return (
    <div className="ProjectCard-container">
      <div className="ProjectCard-content">
        <ProjectCard />
      </div>
    </div>
  );
}

export default Project;

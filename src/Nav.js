import React, { useState, useEffect } from "react";
import "./Nav.css";

function Nav() {
  const [scrollDown, setScrollDown] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollDown(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="Nav-Container"
      style={{
        backgroundColor: scrollDown ? "rgba(0, 0, 0, 0.8)" : "transparent",
      }}
    >
      <div className="Logo" onClick={scrollToTop}>
        JH' Portfolio
      </div>
      <div className="Menu-container">
        <ul className="Nav-menu">
          <li onClick={() => scrollToSection("about")}>About</li>
          <li onClick={() => scrollToSection("skills")}>Skills</li>
          <li onClick={() => scrollToSection("project")}>Project</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;

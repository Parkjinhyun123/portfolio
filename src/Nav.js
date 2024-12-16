import React, { useState, useEffect } from "react";
import "./Nav.css";
import { motion, useScroll } from "framer-motion";

function Nav() {
  const [scrollDown, setScrollDown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
      <div className="Hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`Menu-container ${isMenuOpen ? "open" : ""}`}>
        {" "}
        <ul className="Nav-menu">
        <li onClick={() => scrollToSection("project")}>Project</li>
          <li onClick={() => scrollToSection("about")}>About</li>
          <li onClick={() => scrollToSection("skills")}>Skills</li>
          <li onClick={() => scrollToSection("contact")}>Contact</li>
        </ul>
      </div>
      <motion.div className="bar" style={{ scaleX: scrollYProgress }} />
    </div>
  );
}

export default Nav;

import Nav from "./Nav";
import "./App.css";
import Banner from "./Banner";
import About from "./About";
import Skills from "./Skills";
import Project from "./Project";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Contact from "./Contact";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />
      <div id="about">
        <About />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="project">
        <Project />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Analytics />
    </div>
  );
}

export default App;

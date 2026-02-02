import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.scss";
import Header from "./components/Header";
import Home from "./page/Home";
import Project from "./page/Project";
import Contact from "./page/Contact";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      offset: 80,
      once: false,
    });
  }, []);

  return (
    <div className="app-shell">
      <div className="global-space">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>
      <Header />

      <main className="page-stack">
        <section id="home" className="page-section home-section">
          <Home />
          <div className="scroll-cue">
            <span className="cue-line" aria-hidden="true" />
            <a className="cue-label" href="#projects">
              Scroll pour voir mes projets
            </a>
          </div>
        </section>

        <section id="projects" className="page-section">
          <Project />
        </section>

        <section id="contact" className="page-section">
          <Contact />
        </section>
      </main>
    </div>
  );
}

export default App;

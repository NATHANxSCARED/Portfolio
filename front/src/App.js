import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
      mirror: true,
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
        </section>

        <section id="projects" className="page-section">
          <Project />
        </section>

        <section id="contact" className="page-section">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;

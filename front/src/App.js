import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./page/Home";
import Project from "./page/Project";
import Contact from "./page/Contact";
import StarField from "./components/star";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      offset: 80,
      once: false,
      mirror: true,
      anchorPlacement: "top-bottom",
    });
  }, []);

  return (
    <div className="app-shell">
      <div className="global-space">
        <StarField count={200} />
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
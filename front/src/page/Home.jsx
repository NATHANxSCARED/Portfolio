import React from "react";
import { FiArrowRight, FiCode, FiLayers, FiPenTool } from "react-icons/fi";
import "./css/Home.scss";

function Home() {
  return (
    <div
      className="App"
      data-aos="zoom-in"
      data-aos-offset="120"
      data-aos-duration="1500"
      data-aos-mirror="true"
    >
      <main className="main" id="home">
        <div className="card">
          <div className="card-content">
            <p className="card-kicker">Portfolio développeur</p>

            <h2 className="card-title">Bienvenue dans mon univers</h2>

            <p className="card-text">
              Passionné par le développement et l'innovation, j'aime faire plein de projets
              informatiques passionnants qui me poussent à repousser mes limites. Explorez mes
              projets pour vous perdre dans cet univers vaste et infini qu'est l'informatique.
              La créativité est mon point fort : j'aime imaginer une maquette et faire tout mon
              possible pour la reproduire.
            </p>

            <div className="card-highlights" aria-label="Points forts">
              <span>
                <FiCode aria-hidden="true" />
                Développement
              </span>
              <span>
                <FiPenTool aria-hidden="true" />
                UI créative
              </span>
              <span>
                <FiLayers aria-hidden="true" />
                Projets concrets
              </span>
            </div>

            <div className="card-actions">
              <a className="contact-btn" href="#contact-form">
                <span>Contactez-moi</span>
                <FiArrowRight aria-hidden="true" />
              </a>

              <a className="projects-btn" href="#projects">
                Voir mes projets
              </a>
            </div>
          </div>
        </div>

          <div className="scroll-cue">
            <span className="cue-line" aria-hidden="true" />
            <a className="cue-label" href="#skills">
              Découvrir mes compétences
            </a>
            <span className="cue-line cue-line2" aria-hidden="true" />

          </div>
      </main>
    </div>
  );
}

export default Home;

import React from "react";
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
            <h2 className="card-title">Bienvenu</h2>
            <p>
              Passionné par le développement et l'innovation, j'aime faire plein de projets
              informatiques passionnants qui me poussent à repousser mes limites. Explorez mes
              projets pour vous perdre dans cet univers vaste et infini qu'est l'informatique.
              La créativité est mon point fort : j'aime imaginer une maquette et faire tout mon
              possible pour la reproduire.
            </p>

            <div className="Btn">
              <a className="contact-btn" href="#contact-form">
                Contact Me
              </a>
            </div>
          </div>
        </div>

          <div className="scroll-cue">
            <span className="cue-line" aria-hidden="true" />
            <a className="cue-label" href="#projects">
              Scroll pour voir mes projets
            </a>
            <span className="cue-line cue-line2" aria-hidden="true" />

          </div>
      </main>
    </div>
  );
}

export default Home;

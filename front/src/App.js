import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <h1 className="title">Nathan's Portfolio</h1>
          <nav className="nav">
            <ul>
              <li><a href="#home" className="nav-link">Home</a></li>
              <li><a href="#projects" className="nav-link">Projects</a></li>
              <li><a href="#contact" className="nav-link">Contact me</a></li>
            </ul>
          </nav>
        </div>
      </header>

      
      <main className="main" id="home">
        <div className="card">
          <div className="card-content">
            <h2 className="card-title">Welcome to My Space</h2>
            <p>
              Passionné par le développement et l'innovation, j'aime fiare plein de project informatique passionant
              qui servent à repoussé mes limites le plus loing possible. Explorez mes 
              projets pour vous perdres dans cette unvier vaste et inifni qui est l'informatique. 
              La créativiter est mon point for j'aime imaginer une maquette et faire tout mon possible pour la reproduire.
            </p>
            
            <div className="Btn">
              <button className="contact-btn">
               Contact Me</button>
                
            
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
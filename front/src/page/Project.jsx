import React from 'react';
import './css/Projects.scss';
import Header from "../components/Header";


const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      title: "Mission Control System",
      description: "Système de contrôle de mission spatiale avec interface temps réel",
      githubUrl: "https://github.com/username/mission-control",
      technologies: ["React", "TypeScript", "WebSocket", "NASA API"]
    },
    {
      id: 2,
      title: "Satellite Tracker",
      description: "Application de suivi de satellites en orbite terrestre",
      githubUrl: "https://github.com/username/satellite-tracker",
      technologies: ["Three.js", "React", "Space API"]
    },
    {
      id: 3,
      title: "Space Weather Dashboard",
      description: "Tableau de bord météorologie spatiale et alertes solaires",
      githubUrl: "https://github.com/username/space-weather",
      technologies: ["Vue.js", "D3.js", "NASA API"]
    },
    {
      id: 4,
      title: "Rocket Launch Simulator",
      description: "Simulateur de lancement de fusées avec physique réaliste",
      githubUrl: "https://github.com/username/rocket-simulator",
      technologies: ["Unity", "C#", "Physics Engine"]
    }
  ];

  return (
    <div className="projects-page">
      <Header />
      <div className="space-background">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>
      
      <div className="projects-container">
        <h1 className="page-title">Projets Spatiaux</h1>
        <p className="page-subtitle">Explorez mes projets liés à l'espace et l'astronomie</p>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="card-glow"></div>
              <div className="card-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                <button 
                  className="github-btn"
                  onClick={() => window.open(project.githubUrl, '_blank')}
                >
                  <span className="btn-text">Voir sur GitHub</span>
                  <span className="btn-icon">🚀</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;

import React from 'react';
import './css/Projects.scss';


const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      title: "Nexly web site",
      description: "Site web profetionelle de présentation de service ",
      githubUrl: "https://github.com/NATHANxSCARED/nexly.git",
      technologies: ["React", "js", "jwt", "bcypt","express","react-routeur"]
    },
    {
      id: 2,
      title: "Ticketing system",
      description: "Application de suivi de tache sur des projects",
      githubUrl: "https://github.com/Nexly-Dev/Ticket",
      technologies: ["React", "jwt", "express","bcypt","UI/UX","SQL"]
    }
  ];

  return (
    <div
      className="projects-page"
      data-aos="zoom-in"
      data-aos-offset="120"
      data-aos-duration="900"
    >
      <div className="space-background">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>
      
      <div className="projects-container">
        <h1 className="page-title">Projets</h1>
        <p className="page-subtitle">Explorez mes projets</p>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card"
            >
              <div className="card-glow"></div>
              <div className="card-content" data-aos="flip-up" data-aos-duration="1500">
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

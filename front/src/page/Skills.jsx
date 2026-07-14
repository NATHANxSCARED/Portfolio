import React from "react";
import { FaCode, FaGraduationCap, FaJava, FaShieldHalved } from "react-icons/fa6";
import {
  SiFigma,
  SiN8N,
  SiNodedotjs,
  SiReact,
  SiThreedotjs,
  SiWordpress,
} from "react-icons/si";
import SkillConstellation from "../components/SkillConstellation";
import "./css/Skills.scss";

const skills = [
  {
    name: "Full-stack",
    icon: FaCode,
    description: "Conception d’applications complètes, de l’interface à la logique serveur.",
    tags: ["Front-end", "Back-end", "API"],
    accent: "cyan",
  },
  {
    name: "React",
    icon: SiReact,
    description: "Interfaces web modernes, réactives et pensées comme des composants réutilisables.",
    tags: ["JavaScript", "SPA", "UI"],
    accent: "blue",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    description: "Services back-end, API et automatisations performantes en JavaScript.",
    tags: ["Express", "REST", "Serveur"],
    accent: "green",
  },
  {
    name: "n8n",
    icon: SiN8N,
    description: "Workflows intelligents pour connecter des outils et automatiser les tâches répétitives.",
    tags: ["Automation", "Workflows", "API"],
    accent: "orange",
  },
  {
    name: "UI / UX",
    icon: SiFigma,
    description: "Maquettes claires et expériences intuitives, du concept jusqu’à l’intégration.",
    tags: ["Design", "Prototype", "Responsive"],
    accent: "purple",
  },
  {
    name: "3D",
    icon: SiThreedotjs,
    description: "Création et intégration d’expériences visuelles immersives pour le web.",
    tags: ["Three.js", "WebGL", "Création"],
    accent: "pink",
  },
  {
    name: "Cybersécurité",
    icon: FaShieldHalved,
    description: "Bonnes pratiques de sécurité appliquées aux applications et aux données.",
    tags: ["Sécurité", "Auth", "Protection"],
    accent: "red",
  },
  {
    name: "WordPress",
    icon: SiWordpress,
    description: "Sites vitrines administrables, personnalisés et adaptés aux besoins métier.",
    tags: ["CMS", "Web", "Sur mesure"],
    accent: "indigo",
  },
];

const credentials = [
  {
    type: "Certification",
    title: "CodinGame — Java",
    description: "Certification validant mes compétences en programmation et résolution de problèmes avec Java.",
    icon: FaJava,
  },
  {
    type: "Diplôme",
    title: "CFC suisse",
    description: "Certificat fédéral de capacité obtenu en Suisse, attestant d’une formation professionnelle complète.",
    icon: FaGraduationCap,
  },
];

function Skills() {
  return (
    <div className="skills-page">
      <div className="skills-container">
        <div className="section-heading" data-aos="fade-up">
          <span className="section-kicker">Mon univers technique</span>
          <h2>Compétences</h2>
          <p>
            Un profil full-stack créatif, capable de transformer une idée en une expérience
            web complète, utile et soignée.
          </p>
        </div>

        <SkillConstellation />

        <div className="skills-grid">
          {skills.map((skill, index) => {
            const SkillIcon = skill.icon;

            return (
              <article
                className={`skill-card skill-card--${skill.accent}`}
                key={skill.name}
                data-aos="fade-up"
                data-aos-delay={(index % 4) * 80}
              >
                <div className="skill-card__top">
                  <span className="skill-icon" aria-hidden="true"><SkillIcon /></span>
                  <span className="skill-index">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>{skill.name}</h3>
                <p>{skill.description}</p>
                <div className="skill-tags" aria-label={`Technologies liées à ${skill.name}`}>
                  {skill.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </article>
            );
          })}
        </div>

        <div className="credentials" id="certifications">
          <div className="section-heading section-heading--compact" data-aos="fade-up">
            <span className="section-kicker">Mon parcours</span>
            <h2>Diplômes &amp; certifications</h2>
          </div>

          <div className="credentials-grid">
            {credentials.map((credential, index) => {
              const CredentialIcon = credential.icon;

              return (
                <article
                  className="credential-card"
                  key={credential.title}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="credential-mark" aria-hidden="true"><CredentialIcon /></div>
                  <div className="credential-content">
                    <span>{credential.type}</span>
                    <h3>{credential.title}</h3>
                    <p>{credential.description}</p>
                  </div>
                  <span className="credential-check" aria-label="Validé">✓</span>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;

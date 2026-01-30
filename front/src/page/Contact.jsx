import React, { useState } from "react";
import "./css/Contact.scss";
import Header from "../components/Header";

const Contact = () => {
  const [status, setStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");

    setStatus(`Merci ${name || ""} je reviens vers toi rapidement.`);
    event.currentTarget.reset();

    setTimeout(() => setStatus(""), 4000);
  };

  return (
    <div className="contact-page">
      <Header />

      <div className="space-background">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>

      <div className="contact-container">
        <div className="intro">
          <p className="eyebrow">Restons en contact</p>
          <h1>Parlons de ton prochain projet</h1>
          <p className="lead">
            Une idee, un besoin ou simplement envie d'echanger ?
            Envoie-moi un message.
          </p>

          <div className="contact-cards">
            <div className="contact-card">
              <span className="card-icon">@</span>
              <div>
                <p className="card-title">Email</p>
                <a href="mailto:nathan@vittoni.ch">nathan@vittoni.ch</a>
              </div>
            </div>
            <div className="contact-card">
              <span className="card-icon">in</span>
              <div>
                <p className="card-title">LinkedIn</p>
                <a
                  href="https://www.linkedin.com/in/nathan-vittoni-47b0bb356/"
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Nom complet
              <input
                type="text"
                name="name"
                placeholder="Jane Doe"
                required
                autoComplete="name"
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                placeholder="nathan@vittoni.ch"
                required
                autoComplete="email"
              />
            </label>
          </div>

          <label>
            Sujet
            <input
              type="text"
              name="subject"
              placeholder="Une mission, une question..."
              required
            />
          </label>

          <label>
            Message
            <textarea
              name="message"
              rows={4}
              placeholder="Decris ton projet ou tes attentes"
              required
            ></textarea>
          </label>

          <button type="submit" className="submit-btn">
            Envoyer le message
          </button>

          {status && <p className="form-status">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;

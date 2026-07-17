import React, { useState } from "react";
import "./css/Contact.scss";

const Contact = () => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
      
      const response = await fetch(`${apiUrl}/email/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus(`Merci ${name} ! Ton message a été envoyé avec succès. Je reviens vers toi rapidement.`);
        event.currentTarget.reset();
        setTimeout(() => setStatus(""), 5000);
      } else {
        setErrorMessage(data.message || "Une erreur est survenue lors de l'envoi.");
        setTimeout(() => setErrorMessage(""), 5000);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setErrorMessage("Impossible de se connecter au serveur. Veuillez réessayer.");
      setTimeout(() => setErrorMessage(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="contact-page"
      data-aos="zoom-in"
      data-aos-offset="120"
      data-aos-duration="900"
    >
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

        <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
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

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Envoi en cours..." : "Envoyer le message"}
          </button>

          {status && <p className="form-status success">{status}</p>}
          {errorMessage && <p className="form-status error">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;

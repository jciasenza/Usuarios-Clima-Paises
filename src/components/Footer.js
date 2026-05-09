import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";


import "./Footer.css";

const whatsapp = "+5491158094982";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* TOP */}
        <div className="footer-top">
          {/* BRAND */}
          <div>
            <div className="footer-brand">
              <div className="footer-logo">
                🌎
              </div>

              <div>
                <h2 className="footer-title">
                  Juan Carlos
                </h2>

                <p className="footer-subtitle">
                  Fullstack Developer
                </p>
              </div>
            </div>

            <p className="footer-description">
              Building modern web
              experiences with React,
              APIs, animations and
              scalable frontend
              architectures.
            </p>
          </div>

          {/* CONTACT */}
          <div className="footer-section">
            <h3>Contact</h3>

            <div className="socials">
              <a
                className="social-link whatsapp"
                href={`https://wa.me/${whatsapp.replace(
                  /\D/g,
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
              </a>

              <a
                href="https://github.com/jciasenza"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link github"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/juan-carlos-iasenza-8119501a9/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link linkedin"
              >
                <FaLinkedin />
              </a>

              <a
                href="mailto:iasenzajuancarlos@gmail.com"
                className="social-link mail"
              >
                <FaEnvelope />
              </a>
            </div>

            <p className="footer-contact-text">
              Open to freelance
              projects, frontend
              opportunities and modern
              React applications.
            </p>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()}
            {" "}
            Juan Carlos Iasenza.
            Todos los derechos
            reservados.
          </p>

          <div className="footer-tech">
            <span className="tech-dot"></span>

            Built with React & CSS
          </div>
        </div>
      </div>
    </footer>
  );
}
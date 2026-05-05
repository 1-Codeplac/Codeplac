import React from 'react';
import { FaInstagram } from 'react-icons/fa'; 
import "../css/footer.css";
import logo from "../../assets/img/uniceplacsimboloAzul.png";

/* FOOTER COMPONENT */
const Footer = () => {
  return (
    <footer className="footer-container">
      
      {/* TOP CONTENT: LOGO AND NAVIGATION */}
      <div className="footer-top">
        <div className="footer-logo">
          <img src={logo} alt="Logo UNICEPLAC" className="logo-image" />
          <span className="logo-text">CodeplaC</span>
        </div>
        
        <nav className="footer-links">
          <a href="/privacidade">PRIVACIDADE</a>
          <a href="/termos">TERMO</a>
          <a href="/cookies">POLITICA DE COOKIES</a>
        </nav>
      </div>

      {/* BOTTOM CONTENT: COPYRIGHT AND SOCIAL */}
      <div className="footer-bottom">
        <p className="copyright">©2024 Desenvolvido pela equipe CodeplaC.</p>
        
        <a 
          href="https://www.instagram.com/codeplac_?igsh=OXV1cXJ2d2toZDEy" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-circle"
          title="Siga-nos no Instagram"
        >
          <FaInstagram size={22} />
        </a>
      </div>

    </footer>
  );
};

export default Footer;
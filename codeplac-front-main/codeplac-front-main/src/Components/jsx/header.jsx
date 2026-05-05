import React, { useState, useEffect } from "react";
import logo from "../../assets/img/logoprincipalparaosite.png";
import "../css/header.css";
import { NavLink } from "react-router-dom";

/* COMPONENTE DE CABEÇALHO PRINCIPAL */
export const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* GERENCIAMENTO DO ESTADO DE ROLAGEM */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header-container ${scrolled ? "scrolled" : ""}`}>
      
      {/* BARRA DE NAVEGAÇÃO PRINCIPAL */}
      <div className="header-main-bar">
        <img src={logo} alt="Codeplac" className="logo-img" />

        {/* NAVEGAÇÃO DESKTOP */}
        <nav className="header-nav desktop-nav">
          <NavLink to="/" end>
            HOME
          </NavLink>
          <NavLink to="/ranking">RANKING</NavLink>

          {/* MENU DROPDOWN DE ATIVIDADES */}
          <div
            className="nav-item-dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span className={dropdownOpen ? "active" : ""}>ATIVIDADES</span>

            {dropdownOpen && (
              <div className="dropdown-menu">
                <NavLink to="/eventos">EVENTOS</NavLink>
                <NavLink to="/historico">HISTÓRICO</NavLink>
                <NavLink to="/galeria">GALERIA</NavLink>
              </div>
            )}
          </div>

          <NavLink to="/equipe">EQUIPE</NavLink>
          <NavLink to="/contato">CONTATOS</NavLink>
        </nav>

        {/* BOTÃO DE MENU MOBILE (HAMBÚRGUER) */}
        <div
          className={`mobile-menu-btn ${mobileOpen ? "open" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* ÁREA DE AUTENTICAÇÃO */}
      <div className="header-login-btn">
        <NavLink to="/login">LOGIN</NavLink>
      </div>

      {/* NAVEGAÇÃO MOBILE */}
      {mobileOpen && (
        <div className="mobile-menu">
          <NavLink to="/" onClick={() => setMobileOpen(false)}>
            HOME
          </NavLink>
          <NavLink to="/ranking" onClick={() => setMobileOpen(false)}>
            RANKING
          </NavLink>
          <NavLink to="/eventos" onClick={() => setMobileOpen(false)}>
            EVENTOS
          </NavLink>
          <NavLink to="/historico" onClick={() => setMobileOpen(false)}>
            HISTÓRICO
          </NavLink>
          <NavLink to="/galeria" onClick={() => setMobileOpen(false)}>
            GALERIA
          </NavLink>
          <NavLink to="/equipe" onClick={() => setMobileOpen(false)}>
            EQUIPE
          </NavLink>
          <NavLink to="/contato" onClick={() => setMobileOpen(false)}>
            CONTATOS
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
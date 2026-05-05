import React, { useState, useEffect } from "react";
import logo from "../../assets/img/logoprincipalparaosite.png";
import "../css/header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { User, LogOut, Key, Trash2, Settings } from "lucide-react"; // Adicionados novos ícones

/* COMPONENTE DE CABEÇALHO PRINCIPAL */
export const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // --- NOVOS ESTADOS PARA O PERFIL ---
  // Mude para 'false' para ver o botão de LOGIN voltar a aparecer
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  /* GERENCIAMENTO DO ESTADO DE ROLAGEM */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- FUNÇÕES DE AÇÃO DO PERFIL ---
  const handleLogout = () => {
    /* LÓGICA DE LOGOUT AQUI (Limpar localStorage, tokens, etc) /**/
    console.log("Usuário deslogado");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleResetPassword = () => {
    /* PODE LEVAR PARA UMA ROTA OU ABRIR UM MODAL /**/
    navigate("/senha?editando=true"); // Exemplo de rota
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.");
    if (confirmDelete) {
      /* ENVIAR REQUISIÇÃO DE EXCLUSÃO PARA O BACKEND /**/
      console.log("Conta excluída");
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  return (
    <header className={`header-container ${scrolled ? "scrolled" : ""}`}>
      
      {/* BARRA DE NAVEGAÇÃO PRINCIPAL */}
      <div className="header-main-bar">
        <img src={logo} alt="Codeplac" className="logo-img" />

        {/* NAVEGAÇÃO DESKTOP */}
        <nav className="header-nav desktop-nav">
          <NavLink to="/" end>HOME</NavLink>
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

      {/* ÁREA DE AUTENTICAÇÃO / PERFIL */}
      <div className="header-auth-section">
        {isLoggedIn ? (
          // SE ESTIVER LOGADO: MOSTRA ÍCONE DE PERFIL E DROPDOWN
          <div 
            className="header-profile-container"
            onMouseEnter={() => setProfileDropdownOpen(true)}
            onMouseLeave={() => setProfileDropdownOpen(false)}
          >
            <div className="header-profile-icon">
              <User size={28} color="#00EAFF" />
            </div>

            {profileDropdownOpen && (
              <div className="profile-actions-dropdown">
                <NavLink to="/perfil" onClick={() => setProfileDropdownOpen(false)}>
                  <Settings size={16} /> Meu Perfil
                </NavLink>
                <button onClick={handleResetPassword} className="dropdown-action-btn">
                  <Key size={16} /> Redefinir Senha
                </button>
                <button onClick={handleDeleteAccount} className="dropdown-action-btn delete">
                  <Trash2 size={16} /> Excluir Conta
                </button>
                <button onClick={handleLogout} className="dropdown-action-btn logout">
                  <LogOut size={16} /> Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          // SE NÃO ESTIVER LOGADO: MOSTRA BOTÃO DE LOGIN
          <div className="header-login-btn">
            <NavLink to="/login">LOGIN</NavLink>
          </div>
        )}
      </div>

      {/* NAVEGAÇÃO MOBILE */}
      {mobileOpen && (
        <div className="mobile-menu">
          <NavLink to="/" onClick={() => setMobileOpen(false)}>HOME</NavLink>
          <NavLink to="/ranking" onClick={() => setMobileOpen(false)}>RANKING</NavLink>
          <NavLink to="/eventos" onClick={() => setMobileOpen(false)}>EVENTOS</NavLink>
          <NavLink to="/historico" onClick={() => setMobileOpen(false)}>HISTÓRICO</NavLink>
          <NavLink to="/galeria" onClick={() => setMobileOpen(false)}>GALERIA</NavLink>
          <NavLink to="/equipe" onClick={() => setMobileOpen(false)}>EQUIPE</NavLink>
          <NavLink to="/contato" onClick={() => setMobileOpen(false)}>CONTATOS</NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
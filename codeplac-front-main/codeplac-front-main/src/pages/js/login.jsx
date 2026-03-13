import React, { useState } from "react";
import "../css/login.css";
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";
import sapoImg from "../../assets/img/sapobone.png"; // Caminho da imagem do sapo

function Login() {
  return (
    <div className="PageWrapper">
      <div className="App login-container">
        <Header />

        {/* Efeitos de Fundo */}
        <div className="login-background-effects">
          <Circle size={500} variant="cyan" className="login-circle-left" />
          <Circle size={400} variant="cyan" className="login-circle-right" />
        </div>

        <main className="login-main">
          <section className="login-card">
            <div className="login-content">
              {/* Lado Esquerdo: Mascote */}
              <div className="login-mascot-container">
                <img
                  src={sapoImg}
                  alt="Mascote CodeplaC"
                  className="mascot-img"
                />
              </div>

              {/* Lado Direito: Formulário */}
              <div className="login-form-container">
                <h1 className="login-title">ACESSE SUA CONTA</h1>
                <div className="title-underline"></div>

                <form className="login-form">
                  <div className="login-input-group">
                    <label>SELECIONE O TIPO DE SUA CONTA</label>
                    <select name="tipo">
                      <option value="usuario">USUÁRIO</option>
                      <option value="adm">ADMINISTRADOR (ADM)</option>
                    </select>
                  </div>

                  <div className="login-input-group">
                    <label>CPF</label>
                    <input type="text" placeholder="000.000.000-00" />
                  </div>

                  <div className="login-input-group">
                    <label>SENHA</label>
                    <input type="password" placeholder="********" />
                    <a href="/senha" className="forgot-password">
                      ESQUECEU SUA SENHA?
                    </a>
                  </div>

                  <button type="submit" className="btn-login">
                    LOGIN
                  </button>
                </form>

                <div className="create-account">
                  <a href="/cadastro">CRIAR UMA CONTA</a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import "../css/login.css";
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";
import sapoImg from "../../assets/img/sapobone.png"; // Caminho da imagem do sapo

import Cookies from "js-cookie";

function Login() {
  const urlfinal = `${process.env.REACT_APP_URL}/auth/login`.replace(
    /([^:]\/)\/+/g,
    "$1",
  );
  const [formData, setFormData] = useState({
    cpf: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const camposVazios = Object.values(formData).some(
      (valor) => valor.trim() === "",
    );
    if (camposVazios) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch(urlfinal, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro do Servidor:", errorText);
        alert("CPF ou senha inválidos.");
        return;
      }
      const { token, cpf } = await response.json();
      Cookies.set("CPF", cpf);
      Cookies.set("Token", token);
      window.location.href = "/perfil";
    } catch (error) {
      console.error(error);
    }
  };
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

                <form className="login-form" onSubmit={handleSubmit}>
                  <div className="login-input-group">
                    <label>SELECIONE O TIPO DE SUA CONTA</label>
                    <select name="tipo">
                      <option value="usuario">USUÁRIO</option>
                      <option value="adm">ADMINISTRADOR (ADM)</option>
                    </select>
                  </div>

                  <div className="login-input-group">
                    <label>CPF</label>
                    <input
                      type="text"
                      placeholder="000.000.000-00"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="login-input-group">
                    <label>SENHA</label>
                    <input
                      type="password"
                      placeholder="********"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
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

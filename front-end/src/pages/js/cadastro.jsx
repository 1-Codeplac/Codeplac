import React, { useState } from "react";
import "../css/login.css"; // Reaproveitamos o CSS base
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";
import sapoImg from "../../assets/img/sapobone.png";

import "../css/cadastro.css"; // CSS específico para a página de cadastro

function Cadastro() {
  const urlfinal = `${process.env.REACT_APP_URL}/users/register`.replace(
    /([^:]\/)\/+/g,
    "$1",
  );
  const [formData, setFormData] = useState({
    cpf: "",
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    senha: "",
    tipoUsuario: "PARTICIPANT", // Mude de "Participant" para "PARTICIPANT"
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
      const data = await response.json();
      if (!response.ok) {
        console.error("Erro do Servidor:", data);
        alert(`Erro: ${data.message || "Falha no cadastro"}`);
        return;
      }
      alert("Cadastro realizado com sucesso!");
      window.location.href = "/login";
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
          <section className="login-card cadastro-card">
            <div className="login-content">
              {/* Lado Esquerdo: Mascote com a borda retangular da imagem */}
              <div className="login-mascot-container">
                <img
                  src={sapoImg}
                  alt="Mascote CodeplaC"
                  className="mascot-img"
                />
              </div>

              {/* Lado Direito: Formulário de Cadastro */}
              <div className="login-form-container">
                <h1 className="login-title">CRIE SUA CONTA</h1>
                <div className="title-underline"></div>

                <form className="login-form" onSubmit={handleSubmit}>
                  <div className="login-input-row">
                    <div className="login-input-group">
                      <label>NOME</label>
                      <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="login-input-group">
                      <label>SOBRENOME</label>
                      <input
                        type="text"
                        name="sobrenome"
                        value={formData.sobrenome}
                        onChange={handleChange}
                      />
                    </div>
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
                    <label>E-MAIL</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="login-input-group">
                    <label>TELEFONE</label>
                    <input
                      type="tel"
                      placeholder="(00) 00000-0000"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="login-input-group">
                    <label>SENHA</label>
                    <input
                      type="password"
                      name="senha"
                      value={formData.senha}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="btn-login btn-cadastrar">
                    CADASTRAR
                  </button>
                </form>

                <div className="create-account">
                  <span>JÁ TEM UMA CONTA? </span>
                  <a href="/login">FAÇA LOGIN</a>
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

export default Cadastro;

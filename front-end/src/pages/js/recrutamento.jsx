import React, { useState } from "react";
import "../css/recrutamento.css";
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";

function Recrutamento() {
  const urlfinal = `${process.env.REACT_APP_URL}/juntese`.replace(
    /([^:]\/)\/+/g,
    "$1",
  );

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    curso: "",
    vinculo: false,
    motivacao: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "radio" ? value === "true" : value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const camposVazios = [
      "nome",
      "email",
      "telefone",
      "curso",
      "motivacao",
    ].some((campo) => formData[campo].trim() === "");
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
        try {
          const errorData = JSON.parse(errorText);
          alert(errorData.message || "Erro ao processar solicitação.");
        } catch {
          alert("Erro ao processar solicitação.");
        }
        return;
      }
      alert("Formulário enviado com sucesso!");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="recruitment-page-wrapper">
      <div className="recruitment-container">
        <Header />

        {/* Efeitos de Fundo Neon */}
        <div className="recruitment-bg-effects">
          <Circle size={500} variant="cyan" className="recruitment-circle-l" />
          <Circle
            size={400}
            variant="purple"
            className="recruitment-circle-r"
          />
        </div>

        <main className="recruitment-main-content">
          <section className="recruitment-card-box">
            <h2 className="recruitment-main-title">
              Formulário de Recrutamento
            </h2>
            <p className="recruitment-subtitle">
              JUNTE-SE AO CODEPLAC!
              <br />
              ABERTO PARA ALUNOS E NÃO-ALUNOS DO UNICEPLAC
            </p>

            <div className="recruitment-form-container">
              <form
                className="recruitment-form-element"
                onSubmit={handleSubmit}
              >
                <div className="recruitment-input-group">
                  <label>Nome:</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                  />
                </div>

                <div className="recruitment-input-group">
                  <label>E-mail:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="recruitment-input-group">
                  <label>Telefone:</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                  />
                </div>

                <div className="recruitment-input-group">
                  <label>Curso:</label>
                  <input
                    type="text"
                    name="curso"
                    value={formData.curso}
                    onChange={handleChange}
                  />
                </div>

                <div className="recruitment-radio-section">
                  <p>Você é aluno do Uniceplac?</p>
                  <div className="recruitment-radio-group">
                    <label>
                      <input
                        type="radio"
                        name="vinculo"
                        value="true"
                        checked={formData.vinculo === true}
                        onChange={handleChange}
                      />
                      Sim
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="vinculo"
                        value="false"
                        checked={formData.vinculo === false}
                        onChange={handleChange}
                      />
                      Não
                    </label>
                  </div>
                </div>

                <div className="recruitment-input-group">
                  <label>Motivação:</label>
                  <input
                    type="text"
                    name="motivacao"
                    value={formData.motivacao}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="recruitment-btn-submit">
                  ENVIAR
                </button>
              </form>

              <div className="recruitment-footer-links">
                <a href="/">VOLTAR PARA A PÁGINA PRINCIPAL</a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Recrutamento;

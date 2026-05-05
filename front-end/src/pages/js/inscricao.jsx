import React, { useState } from "react";
import "../css/inscricao.css";
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";
import sapoImg from "../../assets/img/sapobone.png";

function Inscricao() {
  const urlfinal = `${process.env.REACT_APP_URL}/equipes/inscricao`.replace(
    /([^:]\/)\/+/g,
    "$1",
  );

  const [formData, setFormData] = useState({
    nome_equipe: "",
    nome_lider: "",
    membro2: "",
    membro3: "",
    membro4: "",
    membro5: "",
    membro6: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const camposObrigatorios = [
      "nome_equipe",
      "nome_lider",
      "membro2",
      "membro3",
      "membro4",
    ];
    const camposVazios = camposObrigatorios.some(
      (campo) => formData[campo].trim() === "",
    );
    if (camposVazios) {
      alert("Por favor, preencha todos os campos obrigatórios!");
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
      alert("Inscrição realizada com sucesso!");
      //window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="enroll-page-wrapper">
      <div className="enroll-container">
        <Header />

        {/* Efeitos de Fundo */}
        <div className="enroll-bg-effects">
          <Circle size={500} variant="cyan" className="enroll-circle-l" />
          <Circle size={400} variant="cyan" className="enroll-circle-r" />
        </div>

        <main className="enroll-main-content">
          <section className="enroll-card-box">
            <div className="enroll-flex-layout">
              {/* Lado Esquerdo: Mascote */}
              <div className="enroll-mascot-side">
                <img
                  src={sapoImg}
                  alt="Mascote"
                  className="enroll-mascot-img"
                />
              </div>

              {/* Lado Direito: Formulário de Inscrição */}
              <div className="enroll-form-side">
                <h1 className="enroll-main-title">INSCREVA SUA EQUIPE</h1>
                <div className="enroll-title-line"></div>

                <p className="enroll-text-info">
                  PREENCHA OS DADOS AO LADO PARA SE INSCREVER NO EVENTO E <br />
                  CRIAR SUA EQUIPE. É PERMITIDO ENTRE 4 A 6 PESSOAS POR EQUIPE.
                </p>

                <form className="enroll-form-element" onSubmit={handleSubmit}>
                  <div className="enroll-input-group">
                    <label className="enroll-label">NOME DA EQUIPE</label>
                    <input
                      type="text"
                      className="enroll-input"
                      name="nome_equipe"
                      value={formData.nome_equipe}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="enroll-input-group">
                    <label className="enroll-label">LÍDER DA EQUIPE</label>
                    <input
                      type="text"
                      className="enroll-input"
                      name="nome_lider"
                      value={formData.nome_lider}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Membros em grid ou lista */}
                  <div className="enroll-members-grid">
                    <div className="enroll-input-group">
                      <label className="enroll-label">MEMBRO 2</label>
                      <input
                        type="text"
                        className="enroll-input"
                        name="membro2"
                        value={formData.membro2}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="enroll-input-group">
                      <label className="enroll-label">MEMBRO 3</label>
                      <input
                        type="text"
                        className="enroll-input"
                        name="membro3"
                        value={formData.membro3}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="enroll-input-group">
                      <label className="enroll-label">MEMBRO 4</label>
                      <input
                        type="text"
                        className="enroll-input"
                        name="membro4"
                        value={formData.membro4}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="enroll-input-group">
                      <label className="enroll-label">
                        MEMBRO 5 (OPCIONAL)
                      </label>
                      <input
                        type="text"
                        className="enroll-input"
                        name="membro5"
                        value={formData.membro5}
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      className="enroll-input-group"
                      style={{
                        gridColumn: "1 / -1",
                        maxWidth: "100%",
                        margin: "10 auto",
                      }}
                    >
                      <label className="enroll-label">
                        MEMBRO 6 (OPCIONAL)
                      </label>
                      <input
                        type="text"
                        className="enroll-input"
                        name="membro6"
                        value={formData.membro6}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <button type="submit" className="enroll-btn-submit">
                    FAZER INSCRIÇÃO
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Inscricao;

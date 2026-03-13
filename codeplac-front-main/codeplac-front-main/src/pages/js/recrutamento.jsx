import React from "react";
import "../css/recrutamento.css";
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";

function Recrutamento() {
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
              <form className="recruitment-form-element">
                <div className="recruitment-input-group">
                  <label>Nome:</label>
                  <input type="text" />
                </div>

                <div className="recruitment-input-group">
                  <label>E-mail:</label>
                  <input type="email" />
                </div>

                <div className="recruitment-input-group">
                  <label>Telefone:</label>
                  <input type="tel" />
                </div>

                <div className="recruitment-input-group">
                  <label>Curso:</label>
                  <input type="text" />
                </div>

                <div className="recruitment-radio-section">
                  <p>Você é aluno do Uniceplac?</p>
                  <div className="recruitment-radio-group">
                    <label>
                      <input type="radio" name="aluno" value="sim" /> Sim
                    </label>
                    <label>
                      <input type="radio" name="aluno" value="nao" /> Não
                    </label>
                  </div>
                </div>

                <div className="recruitment-input-group">
                  <label>Motivação:</label>
                  <textarea rows="5"></textarea>
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

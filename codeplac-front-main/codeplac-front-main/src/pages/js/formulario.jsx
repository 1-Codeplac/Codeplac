import React from "react";
import "../css/formulario.css";
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";

function Formulario() {
  return (
    <div className="formulario-page-wrapper">
      <div className="formulario-container">
        <Header />

        {/* Efeitos de Fundo Neon */}
        <div className="formulario-bg-effects">
          <Circle size={500} variant="cyan" className="formulario-circle-l" />
          <Circle size={400} variant="purple" className="formulario-circle-r" />
        </div>

        <main className="formulario-main-content">
          <section className="formulario-card-box">
            <h2 className="formulario-main-title">Formulário de Feedback</h2>
            <p className="formulario-subtitle">
              JUNTE-SE AO CODEPLAC!
              <br />
              ABERTO PARA ALUNOS E NÃO-ALUNOS DO UNICEPLAC
            </p>

            <div className="formulario-form-container">
              <form className="formulario-form-element">
                <div className="formulario-input-group">
                  <label>Nome:</label>
                  <input type="text" />
                </div>

                <div className="formulario-input-group">
                  <label>E-mail:</label>
                  <input type="email" />
                </div>

                <div className="formulario-input-group">
                  <label>Telefone:</label>
                  <input type="tel" />
                </div>

                <div className="formulario-input-group">
                  <label>Curso:</label>
                  <input type="text" />
                </div>

                <div className="formulario-radio-section">
                  <p>Você é aluno do Uniceplac?</p>
                  <div className="formulario-radio-group">
                    <label>
                      <input type="radio" name="aluno" value="sim" /> Sim
                    </label>
                    <label>
                      <input type="radio" name="aluno" value="nao" /> Não
                    </label>
                  </div>
                </div>

                <div className="formulario-input-group">
                  <label>Feedback:</label>
                  <textarea rows="5"></textarea>
                </div>

                <button type="submit" className="formulario-btn-submit">
                  ENVIAR
                </button>
              </form>

              <div className="formulario-footer-links">
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

export default Formulario;

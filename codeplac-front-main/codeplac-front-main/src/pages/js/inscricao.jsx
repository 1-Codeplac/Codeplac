import React from "react";
import "../css/inscricao.css";
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";
import sapoImg from "../../assets/img/sapobone.png";

function Inscricao() {
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

                <form className="enroll-form-element">
                  <div className="enroll-input-group">
                    <label className="enroll-label">NOME DA EQUIPE</label>
                    <input type="text" className="enroll-input" />
                  </div>

                  <div className="enroll-input-group">
                    <label className="enroll-label">LÍDER DA EQUIPE</label>
                    <input type="text" className="enroll-input" />
                  </div>

                  {/* Membros em grid ou lista */}
                  <div className="enroll-members-grid">
                    <div className="enroll-input-group">
                      <label className="enroll-label">MEMBRO 1</label>
                      <input type="text" className="enroll-input" />
                    </div>
                    <div className="enroll-input-group">
                      <label className="enroll-label">MEMBRO 2</label>
                      <input type="text" className="enroll-input" />
                    </div>
                    <div className="enroll-input-group">
                      <label className="enroll-label">MEMBRO 3</label>
                      <input type="text" className="enroll-input" />
                    </div>
                    <div className="enroll-input-group">
                      <label className="enroll-label">MEMBRO 4</label>
                      <input type="text" className="enroll-input" />
                    </div>
                    <div className="enroll-input-group">
                      <label className="enroll-label">
                        MEMBRO 5 (OPCIONAL)
                      </label>
                      <input type="text" className="enroll-input" />
                    </div>
                    <div className="enroll-input-group">
                      <label className="enroll-label">
                        MEMBRO 6 (OPCIONAL)
                      </label>
                      <input type="text" className="enroll-input" />
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

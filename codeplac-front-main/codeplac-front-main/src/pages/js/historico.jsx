import React from "react";
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Box from "../../Components/jsx/box";
import Circle from "../../Components/jsx/circle";

import "../css/historico.css";

export function Historico() {
  return (
    <div className="page-wrapper">
      {/* CÍRCULOS FUNDO */}
      <div className="historico-circle">
        <Circle size={320} variant="purple" className="circle-3" />
        <Circle size={320} variant="cyan" className="circle-4" />
      </div>

      <div className="App">
        <Header />

        <Box>
          {/* HERO */}
          <div className="historico-hero">
            <h1 className="historico-title">Histórico</h1>
            <p className="historico-subtitle">
              informações das últimas competições
            </p>
          </div>
        </Box>

        {/* CARD PRINCIPAL */}
        <section className="historico-section">
          <div className="historico-card">
            {/* ITEM 1 */}
            <div className="historico-item">
              <div className="year">
                <span className="star">✦</span>
                <h3>2024/2</h3>
              </div>

              <div className="year-content">
                <p>
                  Evento focado exclusivamente na competição, reunindo
                  participantes para testar habilidades de programação e
                  resolver desafios em um ambiente dinâmico.
                </p>

                <div className="buttons">
                  <button className="btn-purple">Galeria</button>
                  <button className="btn-outline">Ranking</button>
                </div>
              </div>
            </div>

            {/* ITEM 2 */}
            <div className="historico-item">
              <div className="year">
                <span className="star">✦</span>
                <h3>2025/1</h3>
              </div>

              <div className="year-content">
                <p>
                  Segunda edição dedicada apenas à competição, mantendo o
                  formato direto e desafiador para os participantes.
                </p>

                <div className="buttons">
                  <button className="btn-purple">Galeria</button>
                  <button className="btn-outline">Ranking</button>
                </div>
              </div>
            </div>

            {/* ITEM 3 */}
            <div className="historico-item">
              <div className="year">
                <span className="star">✦</span>
                <h3>2025/2</h3>
              </div>

              <div className="year-content">
                <p>
                  Evento com programação completa, unindo competição, abertura,
                  instruções e encerramento, oferecendo uma experiência mais
                  organizada e dinâmica.
                </p>

                <div className="buttons">
                  <button className="btn-purple">Galeria</button>
                  <button className="btn-outline">Ranking</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default Historico;

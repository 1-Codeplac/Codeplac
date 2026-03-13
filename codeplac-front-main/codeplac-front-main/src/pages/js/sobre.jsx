import React from "react";
import "../css/sobre.css";

import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Frogbyte from "../../Components/jsx/frogbyte";
import Box from "../../Components/jsx/box";
import enfeiteImg from "../../assets/img/enfeite.png";
import img1 from "../../assets/img/img1.png";
import Circle from "../../Components/jsx/circle";

export default function Sobre() {
  return (
    <div className="PageWrapper">
      <div className="App">
        <Header />

        <div className="sobre-glows">
          <div className="sobre-glow-purple" />
          <div className="sobre-glow-cyan" />
        </div>

        <div className="sobre-circles-bg">
          <Circle className="sobre-circle sobre-circle-purple top-left" />
          <Circle className="sobre-circle sobre-circle-cyan bottom-right" />
        </div>

        <section className="container">
          <h1 className="main-title">
            Sobre o <span className="highlight">CodeplaC</span>
          </h1>

          {/* CARD SUPERIOR */}
          <div className="card">
            <div className="card-sidebar">
              <img src={enfeiteImg} alt="Enfeite" className="card-ornament" />
            </div>
            <div className="card-content">
              <h2 className="card-title">
                SOBRE O DESAFIO DE{" "}
                <span className="highlight-alt">PROGRAMAÇÃO</span>
              </h2>
              <div className="card-text">
                <p>
                  A computação moderna requer alto grau de comprometimento,
                  expertise e dedicação, tornando a profissão desafiadora no
                  sentido de exigir, dentre outros fatores, uma atualização e
                  capacitação diárias. Nesse sentido, visando o aprimoramento do
                  corpo discente com vistas aos desafios da área de Tecnologia
                  da Informação, o Prof. M. Sc. Pedro Manoel idealizou o 1º
                  Desafio de Programação, realizado no final do semestre
                  acadêmico de 2024, tendo como competidores os alunos do 1º
                  ADS, 1º ES e 2º ES, que cursavam a disciplina de Algoritmos e
                  Programação.
                </p>
              </div>
            </div>
          </div>

          {/* SEÇÃO 2: EVENTO E FEEDBACK */}
          <div className="feedback-section">
            <div className="feedback-content">
              <h2 className="feedback-title">EVENTO E FEEDBACK</h2>
              <div className="feedback-text">
                <div className="feedback-text-inner">
                  <p>
                    Por oportuno, foi aberta a possibilidade para os demais
                    alunos dos outros períodos participarem como espectadores a
                    fim de avaliarem o evento, bem como realizar críticas para
                    sua melhoria.
                  </p>
                  <p>
                    O evento foi considerado pela grande maioria dos discentes
                    como produtivo e importante para o crescimento da maturidade
                    acadêmica. Desse modo, o Prof. M. Sc. Pedro Manoel reuniu as
                    alunas Ágatha Ariell e Giovanna Rocha a fim de convidá-las a
                    montar o Projeto de Extensão CODEPLAC e apresentá-lo ao
                    coordenador do curso, como também, apresentando a motivação
                    e a estrutura inicial.
                  </p>
                </div>
              </div>
            </div>
            <div className="mascot-display">
              <Frogbyte />
            </div>
          </div>

          {/* SEÇÃO 3: A CONCRETIZAÇÃO DO PROJETO */}
          <section className="concretizacao-section">
            <div className="concretizacao-image">
              <img src={img1} alt="Ícone Código" className="img-torta" />
            </div>
            <div className="concretizacao-content">
              <h2 className="concretizacao-title">
                A CONCRETIZAÇÃO DO PROJETO
              </h2>
              <div className="concretizacao-text">
                <p>
                  A partir desse momento, foi registrado o domínio
                  www.codeplac.com.br, ainda a contratação do provedor web para
                  a hospedagem do site. O Prof. M. Sc. Washington aprovou o
                  projeto assim como realizou todas as gestões necessárias à sua
                  execução e demais coordenações com os setores da UNICEPLAC,
                  garantindo a concretização do projeto.
                </p>
              </div>
            </div>
          </section>
        </section>

        {/* SEÇÃO 4: MISSÃO E FUTURO COM BOX E FOOTER INTEGRADO */}
        <section className="missao-futuro-section">
          <div className="box-inverted">
            <Box />

            <div className="missao-futuro-overlay">
              {/* GRID LIMITADO */}
              <div className="missao-futuro-grid">
                <div className="missao-column">
                  <h2 className="section-subtitle">A MISSÃO DO CODEPLAC</h2>
                  <p>
                    Dentre várias reuniões realizadas no período das férias
                    acadêmicas, construímos todo o core essencial para a
                    construção de todo o portfólio definido. Hoje, o CODEPLAC é
                    a realidade que expressa a vontade dos discentes em serem
                    desafiados em conhecimento, habilidade e competência,
                    fatores que o mercado de trabalho exige e espera do
                    acadêmico da UNICEPLAC.
                  </p>
                </div>

                <div className="futuro-column">
                  <h2 className="section-subtitle">O FUTURO DO CODEPLAC</h2>
                  <p>
                    Portanto, o CODEPLAC é mais que uma plataforma que reúne os
                    acadêmicos de TI da UNICEPLAC. Torna-se a referência de
                    excelência intelectual, proporcionando aos alunos o
                    sentimento de competitividade, unindo os laços de
                    profissionalismo e gerando o espírito de corpo na produção
                    da solução computacional.
                  </p>
                </div>
              </div>

              <p className="missao-footer-text">
                Desafiar nosso corpo discente a superar desafios inerentes à
                profissão e internalizar a responsabilidade do trabalho são
                fatores que compõem a missão do CODEPLAC.
              </p>
            </div>
          </div>
        </section>

        <div className="footer-absolute-overlay">
          <Footer />
        </div>
      </div>
    </div>
  );
}

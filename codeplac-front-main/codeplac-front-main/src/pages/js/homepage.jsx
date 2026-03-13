import React from "react";
import { Zap, Target, Users } from "lucide-react";

/* COMPONENTES */
import Header from "../../Components/jsx/header";
import Box from "../../Components/jsx/box";
import Footer from "../../Components/jsx/footer";
import { Link } from "react-router-dom";
import Circle from "../../Components/jsx/circle";

/* ESTILOS */
import "../css/homepage.css";

/* PÁGINA INICIAL (HOMEPAGE) */
export function Homepage() {
  return (
    <div className="page-wrapper">
      {/* ELEMENTOS VISUAIS DE FUNDO */}
      <div className="circle-background">
        <Circle size={420} variant="purple" />
        <Circle size={360} variant="cyan" />
      </div>

      <div className="App">
        <Header />

        {/* SEÇÃO HERO - PRINCIPAL */}
        <Box>
          <div className="hero-top">
            <div className="title-wrapper">
              <h1 className="hero-title">CODEPLAC</h1>
              <p className="subtitle1">
                {" "}
                Competição de programação em C e Java{" "}
              </p>
            </div>
          </div>
        </Box>

        {/* SEÇÃO DE CHAMADA PARA AÇÃO (CTA) */}
        <div className="hero-bottom">
          <Link to="/sobre" className="btn-conheca floating-btn">
            CONHEÇA O CODEPLAC!
          </Link>
          <h2 className="main-headline">
            TREINE, COMPITA, <span className="highlight-purple">EVOLUA!</span>
          </h2>
          <p className="description-text">
            Junte-se à nossa comunidade para resolver problemas complexos,
            colaborar com os melhores e superar os limites das suas habilidades.
          </p>
        </div>

        {/* SEÇÃO DE CARTÕES INFORMATIVOS */}
        <section className="info-cards-section">
          <div className="cards-container">
            {/* CARD: CONEXÃO & DESAFIOS */}
            <div className="info-card purple-theme">
              <div className="card-header">
                <div className="icon-box">
                  <Zap size={24} color="#a855f7" />
                </div>
              </div>
              <h3>Conexão & Desafios</h3>
              <p>
                Conectamos estudantes de programação com desafios para superarem
                seus limites. Aqui, você testa suas habilidades em competições
                que garantem experiência e reconhecimento.
              </p>
            </div>

            {/* CARD: COMPETIÇÃO */}
            <div className="info-card cyan-theme">
              <div className="card-header">
                <div className="icon-box">
                  <Target size={24} color="#00eaff" />
                </div>
              </div>
              <h3>Competição</h3>
              <p>
                Nosso objetivo é criar um ambiente que incentive o
                desenvolvimento de habilidades de programação entre os nossos
                alunos, proporcionando aprendizado prático e competitivo.
              </p>
            </div>

            {/* CARD: PÚBLICO-ALVO */}
            <div className="info-card purple-theme">
              <div className="card-header">
                <div className="icon-box">
                  <Users size={24} color="#a855f7" />
                </div>
              </div>
              <h3>Público-alvo</h3>
              <p>
                Nosso público-alvo são os alunos, a força vital da nossa
                plataforma. Estamos aqui para oferecer uma experiência que
                impulsione suas carreiras e habilidades.
              </p>
            </div>

            {/* EFEITOS DE BRILHO (GLOW) */}
            <div className="glow purple"></div>
            <div className="glow cyan"></div>

            {/* SEÇÃO INSTITUCIONAL - COMPROMISSO */}
            <section className="compromisso-section">
              <h2 className="compromisso-title">Nosso Compromisso</h2>
              <div className="compromisso-content">
                <div className="compromisso-item">
                  <p>
                    {" "}
                    <strong> MISSÃO:</strong> Nossa missão é capacitar os alunos
                    oferecendo oportunidades de aprendizado por meio de
                    competições desafiadoras e eventos que promovem o
                    desenvolvimento profissional na área de tecnologia.
                  </p>
                </div>
                <div className="compromisso-item">
                  <p>
                    {" "}
                    <strong>VISÃO:</strong> Ser a plataforma referência para
                    competições de programação no ambiente acadêmico, preparando
                    os alunos para enfrentar desafios do mercado de trabalho e
                    incentivando a inovação tecnológica.
                  </p>
                </div>
                <div className="compromisso-item">
                  <p>
                    {" "}
                    <strong> VALORES:</strong> Inovação: Inspiramos criatividade
                    com novas abordagens e desafios. Aprendizado Contínuo:
                    Promovemos crescimento pessoal e profissional a cada
                    desafio.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default Homepage;

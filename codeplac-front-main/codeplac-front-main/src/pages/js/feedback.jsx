import React from "react";
import { MessageSquareQuote } from "lucide-react";

// Componentes
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";
import Box from "../../Components/jsx/box";

// Imagens
import img3 from "../../assets/img/img3.png";
import logoIcon from "../../assets/img/enfeite.png";

// CSS Exclusivo
import "../css/feedback.css";

export default function Feedback() {
  // Lista de depoimentos com a sequência: Roxo -> Ciano -> Roxo
  const depoimentos = [
    {
      nome: "Leo S.",
      cargo: "1º Lugar no Ranking Geral",
      texto:
        "Entrei no CODEPLAC como um novato, mas o sistema de ranking e as atividades desafiadoras me fizeram evoluir incrivelmente rápido. Graças ao ambiente competitivo, hoje me sinto pronto para o mercado de trabalho. A CODEPLAC é a melhor!",
      colorClass: "fb-purple",
    },
    {
      nome: "Leo S.",
      cargo: "1º Lugar no Ranking Geral",
      texto:
        "O que mais amo na CODEPLAC é o senso de comunidade. O suporte técnico é rápido e os desafios em equipe são pensados para forçar você a pensar fora da caixa. É mais que uma plataforma, é um acelerador de carreira.",
      colorClass: "fb-cyan",
    },
    {
      nome: "Leo S.",
      cargo: "1º Lugar no Ranking Geral",
      texto:
        "O layout visual da plataforma é limpo e motivador, e a forma como o ranking é estruturado nos mantém sempre buscando o próximo nível. Um recurso indispensável para quem leva programação a sério.",
      colorClass: "fb-purple",
    },
  ];

  return (
    <div className="fb-page-wrapper">
      <Header />

      {/* FUNDO NEON ESTRUTURADO */}
      <div className="fb-bg-elements">
        <Circle size={500} variant="purple" className="fb-circle-left" />
        <Circle size={450} variant="cyan" className="fb-circle-right" />
      </div>

      <main className="fb-main-container">
        {/* TÍTULO PRINCIPAL */}
        <h1 className="fb-main-title">Feedback</h1>

        {/* BANNER DE COMUNIDADE (NEON CIANO) */}
        <section className="fb-banner-hero">
          <div className="fb-banner-icon-area">
            <img
              src={logoIcon}
              alt="Icone Decorativo"
              className="fb-logo-mini"
            />
          </div>
          <div className="fb-banner-text">
            <h2>
              O PODER DA <span className="fb-highlight-cyan">COMUNIDADE!</span>
            </h2>
            <p>
              Na CODEPLAC, cada linha de código conta uma história. Esta página
              é dedicada a celebrar as jornadas, os aprendizados e as conquistas
              dos nossos usuários e competidores.
            </p>
          </div>
        </section>

        {/* SEÇÃO DE DEPOIMENTOS (CARDS COM ESTILO DE CONTATO) */}
        <section className="fb-testimonials-section">
          <h2 className="fb-section-headline">
            O QUE OS NOSSOS <br />
            <span className="fb-highlight-purple">COMPETIDORES DIZEM:</span>
          </h2>
          <p className="fb-section-description">
            Leia o que os membros da nossa comunidade têm a dizer sobre como a
            CODEPLAC impulsionou suas habilidades e carreiras:
          </p>

          <div className="fb-cards-grid">
            {depoimentos.map((item, index) => (
              <div
                key={index}
                className={`fb-testimonial-card ${item.colorClass}`}
              >
                <div className="fb-icon-wrapper">
                  <MessageSquareQuote size={22} />
                </div>

                <div className="fb-card-body">
                  <h3 className="fb-user-name">{item.nome}</h3>
                  <span className="fb-user-rank">{item.cargo}</span>
                  <p className="fb-user-text">"{item.texto}"</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SEÇÃO FINAL: PRÓXIMO NÍVEL (BOX INVERTIDO) */}
        <section className="fb-next-level-section">
          <div className="fb-box-wrapper">
            <Box /> {/* Componente de fundo curvado */}
            <div className="fb-next-level-overlay">
              <div className="fb-next-level-container">
                <div className="fb-next-level-content">
                  <h2 className="fb-next-level-title">
                    SEU FEEDBACK É NOSSO PRÓXIMO NÍVEL!
                  </h2>

                  <p className="fb-next-level-desc">
                    Você também tem uma história para compartilhar? Seu sucesso
                    nos inspira a melhorar e expandir nossa plataforma.
                  </p>

                  <button className="fb-btn-formulario-cta">FORMULÁRIO</button>
                </div>

                <div className="fb-next-level-image">
                  <img src={img3} alt="Ilustração Próximo Nível" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

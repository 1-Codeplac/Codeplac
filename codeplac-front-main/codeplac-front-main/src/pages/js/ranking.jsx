import React from "react";
import { useEffect } from "react";
import "../css/ranking.css";

// COMPONENTES
import Header from "../../Components/jsx/header";
import Box from "../../Components/jsx/box";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";

// IMAGENS PODIO
import podioOuro from "../../assets/img/podioouro.png";
import podioPrata from "../../assets/img/podioprata.png";
import podioBronze from "../../assets/img/podiobronze.png";

import frogOuro from "../../assets/img/frogouro.png";
import frogPrata from "../../assets/img/frogprata.png";
import frogBronze from "../../assets/img/frogbronze.png";

export default function Ranking() {
  useEffect(() => {
    const items = document.querySelectorAll(".podium-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.35 },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-wrapper">
      {/* BACKGROUND */}
      <div className="ranking-circle">
        <Circle size={420} variant="purple" />
        <Circle size={360} variant="cyan" />
      </div>

      <Header />

      {/* HERO / BOX */}
      <Box className="ranking-box">
        {/* aqui pode ter texto, chamada, etc */}
      </Box>

      {/* PODIUM — FORA DO BOX */}
      <section className="podium-section">
        <h1 className="podium-title">PÓDIO</h1>

        <p className="podium-description">
          Este é o nosso famoso pódio, onde as mentes mais brilhantes e
          talentosas se destacam. Cada ponto representa o fruto do esforço e da
          dedicação, refletindo a jornada de superação de cada equipe.
        </p>

        <div className="podium-wrapper">
          <div className="podium-item second">
            <span className="points">90 PTS</span>
            <img src={frogPrata} className="frog" />
            <img src={podioPrata} className="podium-base" />
            <span className="position">2</span>
            <span className="team-name">Team Aurora</span>
          </div>
          <div className="podium-item first">
            <span className="points gold">95 PTS</span>
            <img src={frogOuro} className="frog" />
            <img src={podioOuro} className="podium-base" />
            <span className="position">1</span>
            <span className="team-name">Team Aurora</span>
          </div>
          <div className="podium-item third">
            <span className="points bronze">82 PTS</span>
            <img src={frogBronze} className="frog" />
            <img src={podioBronze} className="podium-base" />
            <span className="position">3</span>
            <span className="team-name">Team Aurora</span>
          </div>
          <div className="podium-ground">
            <span className="ring ring-1"></span>
            <span className="ring ring-2"></span>
            <div className="cyan-blur" />
          </div>{" "}
          {/* ELIPSES DECORATIVAS */}
        </div>
      </section>

      <section className="ranking-table-section">
        <h2 className="ranking-title">RANKING</h2>

        <div className="ranking-table">
          <div className="ranking-header">
            <span>POSIÇÃO</span>
            <span>EQUIPE</span>
            <span>PONTUAÇÃO</span>
          </div>

          <div className="ranking-row">
            <span>4º</span>
            <span>Equipe Alpha</span>
            <span>70 pontos</span>
          </div>

          <div className="ranking-row">
            <span>5º</span>
            <span>Equipe Alpha</span>
            <span>70 pontos</span>
          </div>

          <div className="ranking-row">
            <span>6º</span>
            <span>Equipe Alpha</span>
            <span>70 pontos</span>
          </div>

          <div className="ranking-row">
            <span>7º</span>
            <span>Equipe Alpha</span>
            <span>70 pontos</span>
          </div>

          <div className="ranking-row">
            <span>8º</span>
            <span>Equipe Alpha</span>
            <span>70 pontos</span>
          </div>

          <div className="ranking-row">
            <span>9º</span>
            <span>Equipe Alpha</span>
            <span>70 pontos</span>
          </div>

          <div className="ranking-row">
            <span>10º</span>
            <span>Equipe Alpha</span>
            <span>70 pontos</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

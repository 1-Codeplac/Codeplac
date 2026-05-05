import React, { useState, useEffect } from "react";
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
  // Estado para armazenar os dados reais vindos do backend
  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    // Função para buscar os dados da API
    const fetchRanking = async () => {
      try {
        const response = await fetch("http://localhost:8080/ranking/list", {
          method: "GET",
          credentials: "include", // Essencial para cookies seguros
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Ordena por pontuação caso o backend não envie ordenado
          const sortedData = data.sort((a, b) => b.pontos - a.pontos);
          setRankingData(sortedData);
        }
      } catch (error) {
        console.error("Erro ao buscar o ranking:", error);
      }
    };

    fetchRanking();

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

  // Helpers para pegar os top 3 e o restante
  const first = rankingData[0] || { equipeNome: "---", pontos: 0 };
  const second = rankingData[1] || { equipeNome: "---", pontos: 0 };
  const third = rankingData[2] || { equipeNome: "---", pontos: 0 };
  const restOfRanking = rankingData.slice(3);

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
            <span className="points">{second.pontos} PTS</span>
            <img src={frogPrata} className="frog" alt="Frog Prata" />
            <img src={podioPrata} className="podium-base" alt="Podio Prata" />
            <span className="position">2</span>
            <span className="team-name">{second.equipeNome}</span>
          </div>
          <div className="podium-item first">
            <span className="points gold">{first.pontos} PTS</span>
            <img src={frogOuro} className="frog" alt="Frog Ouro" />
            <img src={podioOuro} className="podium-base" alt="Podio Ouro" />
            <span className="position">1</span>
            <span className="team-name">{first.equipeNome}</span>
          </div>
          <div className="podium-item third">
            <span className="points bronze">{third.pontos} PTS</span>
            <img src={frogBronze} className="frog" alt="Frog Bronze" />
            <img src={podioBronze} className="podium-base" alt="Podio Bronze" />
            <span className="position">3</span>
            <span className="team-name">{third.equipeNome}</span>
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

          {restOfRanking.length > 0 ? (
            restOfRanking.map((item, index) => (
              <div className="ranking-row" key={item.id || index}>
                <span>{index + 4}º</span>
                <span>{item.equipeNome}</span>
                <span>{item.pontos} pontos</span>
              </div>
            ))
          ) : (
            <div className="ranking-row">
              <span style={{ gridColumn: "span 3", textAlign: "center" }}>
                Aguardando atualização dos resultados...
              </span>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

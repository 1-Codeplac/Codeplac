import React from "react";
import { Link } from "react-router-dom";

// Componentes
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import EquipeCard from "../../Components/jsx/EquipeCard";
import Circle from "../../Components/jsx/circle";

// Assets
import fotoPedro from "../../assets/img/profpedroteste.png";

// CSS
import "../css/equipe.css";

export function Equipe() {
  // Cores padronizadas da sua identidade visual
  const cores = {
    ciano: "#2bc4d9",
    roxo: "#a45ee5",
  };

  // Organização dos dados por seções para facilitar a renderização
  const dadosEquipe = {
    ceos: [
      {
        id: 1,
        nome: "Pedro Manoel",
        funcao: "CEO",
        foto: fotoPedro,
        cor: cores.ciano,
      },
      {
        id: 2,
        nome: "Pedro Manoel",
        funcao: "CEO",
        foto: fotoPedro,
        cor: cores.ciano,
      },
    ],
    coFundadora: [
      {
        id: 3,
        nome: "Pedro Manoel",
        funcao: "CEO",
        foto: fotoPedro,
        cor: cores.roxo,
      },
    ],
    desenvolvedores: [
      {
        id: 4,
        nome: "Pedro Manoel",
        funcao: "CEO",
        foto: fotoPedro,
        cor: cores.ciano,
      },
      {
        id: 5,
        nome: "Pedro Manoel",
        funcao: "CEO",
        foto: fotoPedro,
        cor: cores.ciano,
      },
      {
        id: 6,
        nome: "Pedro Manoel",
        funcao: "CEO",
        foto: fotoPedro,
        cor: cores.ciano,
      },
      {
        id: 7,
        nome: "Pedro Manoel",
        funcao: "CEO",
        foto: fotoPedro,
        cor: cores.ciano,
      },
      {
        id: 8,
        nome: "Pedro Manoel",
        funcao: "CEO",
        foto: fotoPedro,
        cor: cores.roxo,
      },
      {
        id: 9,
        nome: "Pedro Manoel",
        funcao: "CEO",
        foto: fotoPedro,
        cor: cores.roxo,
      },
      {
        id: 10,
        nome: "Pedro Manoel",
        funcao: "CEO",
        foto: fotoPedro,
        cor: cores.roxo,
      },
      {
        id: 11,
        nome: "Pedro Manoel",
        funcao: "CEO",
        foto: fotoPedro,
        cor: cores.roxo,
      },
      {
        id: 12,
        nome: "Pedro Manoel",
        funcao: "CEO",
        foto: fotoPedro,
        cor: cores.ciano,
      },
      {
        id: 13,
        nome: "Pedro Manoel",
        funcao: "CEO",
        foto: fotoPedro,
        cor: cores.ciano,
      },
      {
        id: 14,
        nome: "Pedro Manoel",
        funcao: "CEO",
        foto: fotoPedro,
        cor: cores.ciano,
      },
      {
        id: 15,
        nome: "Pedro Manoel",
        funcao: "CEO",
        foto: fotoPedro,
        cor: cores.ciano,
      },
      {
        id: 16,
        nome: "Pedro Manoel",
        funcao: "CEO",
        foto: fotoPedro,
        cor: cores.roxo,
      },
      {
        id: 17,
        nome: "Pedro Manoel",
        funcao: "CEO",
        foto: fotoPedro,
        cor: cores.roxo,
      },
      {
        id: 18,
        nome: "Pedro Manoel",
        funcao: "CEO",
        foto: fotoPedro,
        cor: cores.roxo,
      },
      {
        id: 19,
        nome: "Pedro Manoel",
        funcao: "CEO",
        foto: fotoPedro,
        cor: cores.roxo,
      },
    ],
    exColaboradores: [
      {
        id: 20,
        nome: "Pedro Manoel",
        funcao: "CEO",
        foto: fotoPedro,
        cor: cores.ciano,
      },
    ],
  };

  const RenderSeção = (titulo, lista, corTitulo) => (
    <section className="equipe-secao">
      <h2 style={{ color: corTitulo }}>{titulo}</h2>
      <div className="equipe-grid">
        {lista.map((membro) => (
          <EquipeCard
            key={membro.id}
            nome={membro.nome}
            funcao={membro.funcao}
            foto={membro.foto}
            linkCurriculo="#"
            corBorda={membro.cor}
          />
        ))}
      </div>
    </section>
  );

  return (
    <div className="equipe-page-wrapper">
      <div className="equipe-circle">
        <Circle size={420} variant="purple" className="equipe-circle-1" />
        <Circle size={360} variant="cyan" className="equipe-circle-2" />
        <Circle size={360} variant="purple" className="equipe-circle-3" />
        <Circle size={420} variant="cyan" className="equipe-circle-4" />
      </div>

      <div className="glow purple 1"></div>
      <div className="glow cyan 1"></div>
      <div className="glow purple 2"></div>
      <div className="glow cyan 2"></div>

      <Header />

      <main className="equipe-content">
        <header className="equipe-header-text">
          <h1>Equipe</h1>
          <p>
            Administradores, gerenciadores, desenvolvedores e colaboradores do
            projeto!
          </p>
        </header>

        {RenderSeção("CEOS", dadosEquipe.ceos, cores.ciano)}
        {RenderSeção("CO-FUNDADORA", dadosEquipe.coFundadora, cores.roxo)}
        {RenderSeção(
          "DESENVOLVEDORES",
          dadosEquipe.desenvolvedores,
          cores.ciano,
        )}
        {RenderSeção(
          "EX-COLABORADORES",
          dadosEquipe.exColaboradores,
          cores.ciano,
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Equipe;

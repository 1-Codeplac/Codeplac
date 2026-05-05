import React from "react";
import "../css/desafios.css";

import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";

// Ícones opcionais (se estiver usando Lucide ou similar)
import { Upload } from "lucide-react";

export default function Desafios() {
  return (
    <div className="desafios-page-wrapper">
        <div className="desafio-circle">
            <Circle size={420} variant="cyan" className="circle-1" />
            <Circle size={420} variant="purple" className="circle-2" />
          </div>
      <Header />

      {/* Glows de Fundo Estilizados */}
      <div className="desafios-glows">
        <div className="desafios-glow-purple" />
        <div className="desafios-glow-cyan" />
      </div>

      <main className="desafios-container">
        <section className="desafios-intro">
          <h1 className="desafios-main-title">Painel de Desafios</h1>
          <p className="desafios-description">
            O Painel de Desafios é a nossa bússola para a excelência. Cada item
            é um convite à inovação e à persistência, traçando a jornada que
            eleva o nível de ambição e a performance de toda a organização.
          </p>
        </section>

        {/* --- DESAFIO 1 --- */}
        <section className="desafio-card">
          <h2 className="desafio-header">
            <span className="dots">● ● ●</span> DESAFIO 1: QUEM PASSOU DE ANO?
          </h2>
          <div className="desafio-content">
            <p>
              O professor Carlos precisa de um programa simples para calcular a
              média final de seus alunos...
            </p>
            <h3 className="sub-header-cyan">Sua Tarefa:</h3>
            <p>
              Você deve criar um programa que leia as duas notas de um aluno,
              calcule a média e imprima "APROVADO" ou "REPROVADO".
            </p>

            <div className="exemplo-box">
              <h4>Exemplo Prático:</h4>
              <pre>
                Se a entrada for: 7.0 8.0 <br />A saída do seu programa deve
                ser: APROVADO
              </pre>
            </div>
          </div>
        </section>

        {/* --- DESAFIO 2 --- */}
        <section className="desafio-card">
          <h2 className="desafio-header">
            <span className="dots">● ● ●</span> DESAFIO 2: VALIDADOR DE CPF
          </h2>
          <div className="desafio-content">
            <p>
              A Receita Federal precisa de um novo sistema validador de CPF...
            </p>
            <h3 className="sub-header-cyan">Como vai funcionar a Entrada:</h3>
            <p>
              O programa lerá uma única linha com uma string de 11 caracteres
              numéricos.
            </p>

            <h3 className="sub-header-cyan">O que seu programa deve fazer:</h3>
            <ol className="desafio-list">
              <p>Calcular o primeiro dígito verificador...</p>
              <p>Calcular o segundo dígito verificador...</p>
              <p>
                Validar: Compare os dois dígitos calculados com os informados.
              </p>
            </ol>

            <div className="exemplo-box">
              <pre>Entrada: 12345678909 | Saída: VALIDO</pre>
            </div>

            <h3 className="sub-header-cyan">Dicas (Regras do Jogo):</h3>
            <p className="dica-text">
              Cuidado com a conversão de caracteres para inteiros (ex: em
              C/Java, `c - '0'`).
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

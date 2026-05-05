import React from "react";
import "../css/contato.css"; // Use o arquivo de contato específico

import { Mail, User, MapPin } from "lucide-react"; // Exemplo com Lucide

import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";
import Box from "../../Components/jsx/box";
import enfeiteImg from "../../assets/img/enfeite.png";

function Contato() {
  return (
    <div className="PageWrapper">
      <div className="App">
        <Header />

        <div className="contato-page-wrapper">
          <div className="contato-circle">
            <Circle size={420} variant="cyan" className="circle-1" />
            <Circle size={420} variant="purple" className="circle-2" />
            <Circle size={420} variant="cyan" className="circle-3" />
          </div>

          <main className="contato-main-container">
            <h1 className="contato-main-title">Contatos</h1>

            {/* CARD INFORMATIVO */}
            <section className="info-card-contato">
              <div className="card-sidebar-contato">
                <img src={enfeiteImg} alt="Enfeite" className="card-ornament" />
              </div>
              <div className="card-content-contato">
                <h2 className="card-title-contato">
                  QUEREMOS OUVIR <span className="highlight-cyan">VOCÊ!</span>
                </h2>
                <div className="card-text-contato">
                  <p>
                    Seja você um competidor com dúvidas sobre as regras, um
                    parceiro em potencial buscando colaboração, ou apenas um
                    entusiasta do código com um feedback, a equipe CODEPLAC está
                    pronta para ajudar.
                  </p>
                  <p>
                    <strong>Suporte Técnico:</strong> Encontrou um bug na
                    plataforma ou precisa de ajuda com seu projeto?
                  </p>
                  <p>
                    <strong>Parcerias e Colaboração:</strong> Tem uma proposta
                    de evento ou patrocínio?
                  </p>
                  <p>
                    <strong>Feedback:</strong> Sua opinião é valiosa! Sugestões
                    sobre o ranking, atividades ou novos recursos.
                  </p>
                  <p>
                    <strong>Outros Assuntos:</strong> Para qualquer outra
                    questão.
                  </p>
                </div>
              </div>
            </section>

            {/* SEÇÃO DO FORMULÁRIO */}
            <section className="form-card">
              <h2 className="form-title">PREENCHA O FORMULÁRIO</h2>
              <p className="form-subtitle">
                Basta preencher os campos abaixo com suas informações e sua
                mensagem.
              </p>

              <form className="contato-form">
                <div className="form-row">
                  <div className="input-group">
                    <label>Nome completo:</label>
                    <input
                      type="text"
                      name="nome"
                      placeholder="Digite seu nome..."
                    />
                  </div>
                  <div className="input-group">
                    <label>E-mail:</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Assunto:</label>
                  <input
                    type="text"
                    name="assunto"
                    placeholder="Qual o motivo do contato?"
                  />
                </div>

                <div className="input-group">
                  <label>Mensagem:</label>
                  <textarea
                    name="mensagem"
                    rows="5"
                    placeholder="Escreva sua mensagem aqui..."
                  ></textarea>
                </div>

                <button type="submit" className="btn-enviar">
                  ENVIAR
                </button>
              </form>
            </section>

            {/* SEÇÃO DE CARTÕES DE CONTATO */}
            <h2 className="info-contato-title">INFORMAÇÕES DE CONTATO</h2>
            <section className="cards-contato-container">
              {/* Card Email */}
              <div className="contato-card card-purple">
                <div className="card-icon icon-purple">
                  <Mail size={20} color="#a855f7" />
                </div>
                <h3>Email:</h3>
                <p>codeplacgroup@gmail.com</p>
              </div>

              {/* Card CEO */}
              <div className="contato-card card-cyan">
                <div className="card-icon icon-cyan">
                  <User size={20} color="#00eaff" />
                </div>
                <h3>CEO do projeto</h3>
                <p>Pro. M.Sc. Pedro Manoel Rosa</p>
              </div>

              {/* Card Endereço */}
              <div className="contato-card card-purple">
                <div className="card-icon icon-purple">
                  <MapPin size={20} color="#a855f7" />
                </div>
                <h3>Endereço:</h3>
                <p>
                  Área Especial para Indústria Lote 2/3, Gama, Brasília - DF
                </p>
              </div>
            </section>

            {/* SEÇÃO MAPA + BOX INVERTIDO */}
            <section className="mapa-section">
              <div className="box-container-invertido">
                <Box className="box-invertido" />
              </div>

              <div className="mapa-content">
                <h2 className="mapa-title">FACULDADE UNICEPLAC</h2>
                <div className="mapa-wrapper-frame">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.725890989083!2d-48.05355452395195!3d-16.001407584666572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a2a9b5b3167a9%3A0xadaac70ed76e5c07!2sCentro%20Universit%C3%A1rio%20do%20Planalto%20Central%20Apparecido%20dos%20Santos!5e0!3m2!1spt-BR!2sbr!4v1709420000000!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Mapa Uniceplac"
                  ></iframe>
                </div>
              </div>
            </section>
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Contato;

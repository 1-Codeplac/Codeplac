import React, { useState } from "react";
import "../css/eventos.css";

// COMPONENTES
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import EventCard from "../../Components/jsx/EventCard";
import Circle from "../../Components/jsx/circle";

// IMAGEM
import eventoBanner from "../../assets/img/eventobanner.png";

const events = [
  {
    id: 1,
    day: "quarta-feira, 29 de outubro",
    title: "palestra sebrae",
    subtitle: "sucesso na era da inteligência artificial",
    date: "29/10",
    time: "08h30 - 10h00",
    local: "auditório vermelho",
    variant: "cyan",
  },
  {
    id: 2,
    day: "quarta-feira, 29 de outubro",
    title: "palestra sebrae",
    subtitle: "sucesso na era da inteligência artificial",
    date: "29/10",
    time: "10h30 - 12h00",
    local: "auditório vermelho",
    variant: "cyan",
  },
  {
    id: 3,
    day: "quinta-feira, 30 de outubro",
    title: "palestra sebrae",
    subtitle: "sucesso na era da inteligência artificial",
    date: "30/10",
    time: "08h30 - 10h00",
    local: "auditório vermelho",
    variant: "purple",
  },
  {
    id: 4,
    day: "sexta-feira, 31 de outubro",
    title: "palestra sebrae",
    subtitle: "sucesso na era da inteligência artificial",
    date: "31/10",
    time: "08h30 - 10h00",
    local: "auditório vermelho",
    variant: "cyan",
  },
];

export default function Eventos() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // 🔹 AGRUPAR EVENTOS POR DIA
  const groupedEvents = events.reduce((acc, event) => {
    if (!acc[event.day]) acc[event.day] = [];
    acc[event.day].push(event);
    return acc;
  }, {});

  return (
    <div className="events-page">
      <Header />

      <div className="eventos-circles-bg">
        <Circle size={400} variant="purple" className="eventos-circle-left" />
        <Circle size={400} variant="cyan" className="eventos-circle-right" />
      </div>

      <main className="events-container">
        {/* HERO */}
        <section className="events-hero">
          <h1>Eventos</h1>
          <p>
            Descubra nossos eventos de programação.
            <br />
            Fique ligado na semana acadêmica da Uniceplac!
          </p>
        </section>

        {/* BANNER + TEXTO */}
        <section className="event-schedule">
          <div className="event-schedule-container">
            <div className="event-banner">
              <img src={eventoBanner} alt="Banner do evento" />
            </div>

            <div className="event-info">
              <h2>
                CRONOGRAMA DO <span>EVENTO</span>
              </h2>

              <p className="event-description">
                Explore o cronograma abaixo para se inteirar de cada momento
                planejado — horários, temas, palestrantes e atividades. Tudo foi
                pensado para oferecer experiências ricas, interativas e
                relevantes.
              </p>

              <div className="event-dates-wrapper">
                <span className="event-dates-line" />
                <ul className="event-dates">
                  <li>Quarta-feira, 29 de Outubro</li>
                  <li>Quinta-feira, 30 de Outubro</li>
                  <li>Sexta-feira, 31 de Outubro</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* EVENTOS POR DIA */}
        <section className="events">
          {Object.entries(groupedEvents).map(([day, dayEvents]) => (
            <section key={day} className="events-day">
              <h2 className={`event-day ${dayEvents[0].variant}`}>{day}</h2>

              <div className="events-grid">
                {dayEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    variant={event.variant} // Aqui ele pega "cyan" ou "purple" do seu array
                    title={event.title}
                    subtitle={event.subtitle}
                    date={event.date}
                    time={event.time}
                    location={event.local}
                  />
                ))}
              </div>
            </section>
          ))}
        </section>
      </main>

      {/* MODAL */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div
            className={`modal ${selectedEvent.variant}`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedEvent.title}</h2>
            <p>{selectedEvent.subtitle}</p>
            <p>
              {selectedEvent.date} — {selectedEvent.time}
            </p>
            <p>local: {selectedEvent.local}</p>

            <button onClick={() => setSelectedEvent(null)}>fechar</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

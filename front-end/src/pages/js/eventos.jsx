import React, { useState, useEffect } from "react";
import "../css/eventos.css";

// COMPONENTES
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import EventCard from "../../Components/jsx/EventCard";
import Circle from "../../Components/jsx/circle";

// IMAGEM
import eventoBanner from "../../assets/img/eventobanner.png";

export default function Eventos() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Substituindo o array estático por um estado que vem do backend
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const carregarEventos = async () => {
      try {
        // Rota pública para listar eventos
        const response = await fetch("http://localhost:8080/event/list", {
          method: "GET",
          credentials: "include", // Mantendo a consistência com cookies seguros[cite: 1, 2]
        });

        if (response.ok) {
          const data = await response.json();
          // Mapeamos os dados do backend para as propriedades que o seu EventCard espera
          const formatados = data.map((ev) => ({
            id: ev.id,
            day: ev.day || "Data a definir", // O backend deve enviar o dia por extenso ou formatamos aqui
            title: ev.title,
            subtitle: ev.description,
            date: ev.date,
            time: ev.time || "Horário a definir",
            local: ev.location || "Auditório",
            variant: ev.id % 2 === 0 ? "purple" : "cyan", // Alterna cores automaticamente
          }));
          setEvents(formatados);
        }
      } catch (err) {
        console.error("Erro ao carregar a agenda de eventos:", err);
      }
    };

    carregarEventos();
  }, []);

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
                  {/* Gerando a lista de dias dinamicamente com base nos eventos carregados */}
                  {Object.keys(groupedEvents).map((dia) => (
                    <li key={dia}>{dia}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* EVENTOS POR DIA */}
        <section className="events">
          {events.length > 0 ? (
            Object.entries(groupedEvents).map(([day, dayEvents]) => (
              <section key={day} className="events-day">
                <h2 className={`event-day ${dayEvents[0].variant}`}>{day}</h2>

                <div className="events-grid">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      style={{ cursor: "pointer" }}
                    >
                      <EventCard
                        variant={event.variant}
                        title={event.title}
                        subtitle={event.subtitle}
                        date={event.date}
                        time={event.time}
                        location={event.local}
                      />
                    </div>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <p
              style={{ textAlign: "center", color: "#aaa", marginTop: "50px" }}
            >
              Carregando as melhores palestras para você...
            </p>
          )}
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

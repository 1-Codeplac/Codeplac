import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import "../css/eventos.css";

// COMPONENTES
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import EventCard from "../../Components/jsx/EventCard";
import Circle from "../../Components/jsx/circle";

// IMAGEM
import eventoBanner from "../../assets/img/eventobanner.png";

// API
import { getAllEvents } from "../../services/eventService"

export default function Eventos() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([])

  useEffect(() => {
    const loadEvents = async () => {
      const events = await getAllEvents()

      setEvents(events)
    }

    loadEvents()
  }, [])

  // 🔹 AGRUPAR EVENTOS POR DIA
  const groupedEvents = events.reduce((acc, event) => {
    if (!acc[event.dataEvento]) acc[event.dataEvento] = [];
    acc[event.dataEvento].push(event);
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
              <h2 className={`event-day ${dayEvents[0].variant}`}>{formatDate(day)}</h2>

              <div className="events-grid">
                {dayEvents.map((event) => (
                  <EventCard
                    key={event.idEvento}
                    variant={"cyan"} // Aqui ele pega "cyan" ou "purple" do seu array
                    title={event.nome}
                    subtitle={event.descricao}
                    date={event.dataEvento}
                    time={event.horario}
                    location={event.lugar}
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
            className={`modal cyan`}
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

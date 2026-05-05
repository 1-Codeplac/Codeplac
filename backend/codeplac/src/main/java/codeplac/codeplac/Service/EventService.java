package codeplac.codeplac.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import codeplac.codeplac.DTO.ResponsesDTO.Event.EventResponse;
import codeplac.codeplac.Exception.Excecao;
import codeplac.codeplac.Model.EventModel;
import codeplac.codeplac.Repository.EventRepository;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public EventResponse createEvent(EventModel eventModel) {
        eventRepository.save(eventModel);

        return createEventResponse(eventModel);
    }

    public List<EventResponse> getAllEvents() {
        List<EventModel> events = eventRepository.findAll();
        List<EventResponse> eventsResponse = new ArrayList<>();

        for (EventModel eventModel : events) {
            eventsResponse.add(createEventResponse(eventModel));
        }

        return eventsResponse;
    }

    public EventResponse getEventById(int id) throws Excecao {
        Optional<EventModel> optionalEvent = eventRepository.findById(id);
        if (optionalEvent.isPresent()) {
            return createEventResponse(optionalEvent.get());
        }

        throw new Excecao("Evento não encontrado com id: " + id);
    }

    public EventResponse updateEvent(int id, EventModel eventModel) throws Excecao {
        Optional<EventModel> optionalEvent = eventRepository.findById(id);

        if (optionalEvent.isPresent()) {
            EventModel existingEvent = optionalEvent.get();

            if (eventModel.getNomeEvento() != null)
                existingEvent.setNomeEvento(eventModel.getNomeEvento());
            if (eventModel.getDescricao() != null)
                existingEvent.setDescricao(eventModel.getDescricao());
            if (eventModel.getAno() != null)
                existingEvent.setAno(eventModel.getAno());
            if (eventModel.getBimestre() != null)
                existingEvent.setBimestre(eventModel.getBimestre());
            if (eventModel.getDataEvento() != null)
                existingEvent.setDataEvento(eventModel.getDataEvento());
            if (eventModel.getLugar() != null)
                existingEvent.setLugar(eventModel.getLugar());
            if (eventModel.getHorario() != null)
                existingEvent.setHorario(eventModel.getHorario());
            if (eventModel.getPeriodo() != null)
                existingEvent.setPeriodo(eventModel.getPeriodo());
            if (eventModel.getTipoEvento() != null)
                existingEvent.setTipoEvento(eventModel.getTipoEvento());

            eventRepository.save(existingEvent);

            return createEventResponse(existingEvent);
        } else {
            throw new Excecao("Evento não encontrado com id: " + id);
        }
    }

    public boolean deleteEvent(int id) throws Excecao {
        if (eventRepository.existsById(id)) {
            eventRepository.deleteById(id);
            return true;
        }

        throw new Excecao("Evento não encontrado com id: " + id);
    }

    private EventResponse createEventResponse(EventModel event) {
        return new EventResponse(
                event.getIdEvento(),
                event.getNomeEvento(),
                event.getDescricao(),
                event.getAno(),
                event.getBimestre(),
                event.getDataEvento(),
                event.getLugar(),
                event.getHorario(),
                event.getPeriodo(),
                event.getTipoEvento());
    }
}

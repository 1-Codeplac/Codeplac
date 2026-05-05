package codeplac.codeplac.Controller; // Define o pacote onde essa classe de controle está localizada

import java.util.List; // Importa a classe List da biblioteca padrão Java, usada para representar listas de objetos

import org.springframework.beans.factory.annotation.Autowired; // Importa a anotação @Autowired para permitir injeção automática de dependências no Spring
import org.springframework.http.HttpStatus; // Importa a enumeração HttpStatus, que define códigos de status HTTP (ex: 200 OK, 404 NOT FOUND)
import org.springframework.http.ResponseEntity; // Importa a classe ResponseEntity, usada para construir a resposta HTTP com corpo, status e headers
import org.springframework.web.bind.annotation.DeleteMapping; // Importa a anotação @DeleteMapping, usada para mapear requisições HTTP DELETE
import org.springframework.web.bind.annotation.GetMapping; // Importa a anotação @GetMapping, usada para mapear requisições HTTP GET
import org.springframework.web.bind.annotation.PathVariable; // Importa a anotação @PathVariable, usada para capturar variáveis do caminho da URL (ex: /{id})
import org.springframework.web.bind.annotation.PostMapping; // Importa a anotação @PostMapping, usada para mapear requisições HTTP POST
import org.springframework.web.bind.annotation.PutMapping; // Importa a anotação @PutMapping, usada para mapear requisições HTTP PUT
import org.springframework.web.bind.annotation.RequestBody; // Importa a anotação @RequestBody, usada para indicar que o corpo da requisição será convertido em um objeto Java
import org.springframework.web.bind.annotation.RequestMapping; // Importa a anotação @RequestMapping, usada para definir o caminho base para todos os endpoints da classe
import org.springframework.web.bind.annotation.RestController; // Importa a anotação @RestController, que define a classe como um controlador REST (retorna JSON por padrão)
import org.springframework.web.server.ResponseStatusException; // Importa a classe ResponseStatusException, que permite lançar exceções com códigos de status HTTP personalizados

import codeplac.codeplac.DTO.ResponsesDTO.Event.EventResponse; // Importa a classe EventResponse, usada como DTO para resposta de eventos
import codeplac.codeplac.Exception.Excecao; // Importa a exceção personalizada Excecao, usada para tratar erros específicos da aplicação
import codeplac.codeplac.Model.EventModel; // Importa a classe EventModel, que representa a entidade/modelo de um evento
import codeplac.codeplac.Service.EventService; // Importa a classe EventService, que contém a lógica de negócio relacionada a eventos

@RestController // Define esta classe como um controlador REST
@RequestMapping("/event") // Define o prefixo da rota para todos os métodos da classe como "/event"
public class EventController {

    @Autowired // Injeta automaticamente a instância do serviço EventService
    EventService eventService;

    @PostMapping("/create") // Mapeia requisições POST para "/event/create"
    public ResponseEntity<EventResponse> criarEvento(@RequestBody EventModel event) {
        return new ResponseEntity<>(eventService.createEvent(event), HttpStatus.CREATED);
    }

    @GetMapping("/list") // Mapeia requisições GET para "/event/list"
    public ResponseEntity<List<EventResponse>> listarEventos() {
        return new ResponseEntity<>(eventService.getAllEvents(), HttpStatus.OK);
    }

    @GetMapping("/{id}") // Mapeia requisições GET para "/event/{id}", buscando evento por ID
    public ResponseEntity<EventResponse> obterEvento(@PathVariable int id) {
        try {
            return new ResponseEntity<>(eventService.getEventById(id), HttpStatus.OK); // Retorna 200 OK após atualização
        } catch (Excecao e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e); // Retorna 404 se o evento não existir
        }
    }

    @PutMapping("/modify/{id}") // Mapeia requisições PUT para "/event/modify/{id}", atualizando evento
    public ResponseEntity<EventResponse> modificarEvento(@PathVariable int id,
            @RequestBody EventModel event) {
        try {
            return new ResponseEntity<>(eventService.updateEvent(id, event), HttpStatus.OK);
        } catch (Excecao e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    @DeleteMapping("/destroy/{id}") // Mapeia requisições DELETE para "/event/destroy/{id}", removendo evento
    public ResponseEntity<Void> apagarEvento(@PathVariable int id) {
        try {
            boolean deleted = eventService.deleteEvent(id);
            if (deleted) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Retorna 204 NO CONTENT se removido com sucesso
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Retorna 404 se o evento não existir
            }
        } catch (Excecao e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e); // Retorna 400 BAD REQUEST em caso de erro na remoção
        }
    }
}
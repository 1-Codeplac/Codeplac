package codeplac.codeplac.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import codeplac.codeplac.DTO.ResponsesDTO.User.EquipeDTO;
import codeplac.codeplac.Service.EquipeService;
import jakarta.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/equipes")
public class EquipeController {

    @Autowired
    private EquipeService equipeService;

    @PostMapping("/inscricao")
    public ResponseEntity<EquipeDTO> criar(@Valid @RequestBody EquipeDTO equipeDTO) {
        try {
            EquipeDTO criada = equipeService.criarEquipe(equipeDTO);
            return new ResponseEntity<>(criada, HttpStatus.CREATED);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Erro ao salvar equipe: " + e.getMessage(), e);
        }
    }

    @GetMapping
    public ResponseEntity<List<EquipeDTO>> listar() {
        try {
            return ResponseEntity.ok(equipeService.listarEquipes());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao listar equipes", e);
        }
    }
}

package codeplac.codeplac.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import codeplac.codeplac.DTO.ResponsesDTO.JunteSeDTO;
import codeplac.codeplac.Model.JunteSeModel;
import codeplac.codeplac.Repository.JunteSeRepository;
import jakarta.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/juntese")
public class JunteSeController {

    @Autowired
    private JunteSeRepository junteseRepository;

    @PostMapping
    public ResponseEntity<JunteSeDTO> submitForm(@Valid @RequestBody JunteSeDTO recrutamentoDTO) {
        try {
            JunteSeModel juntese = new JunteSeModel();
            juntese.setNome(recrutamentoDTO.getNome());
            juntese.setEmail(recrutamentoDTO.getEmail());
            juntese.setTelefone(recrutamentoDTO.getTelefone());
            juntese.setCurso(recrutamentoDTO.getCurso());
            juntese.setVinculo(recrutamentoDTO.isVinculo());
            juntese.setMotivacao(recrutamentoDTO.getMotivacao());

            junteseRepository.save(juntese);
            return new ResponseEntity<>(recrutamentoDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Erro ao salvar o formulário: " + e.getMessage(), e);
        }
    }
}
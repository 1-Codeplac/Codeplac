package codeplac.codeplac.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import codeplac.codeplac.Exception.Excecao;
import codeplac.codeplac.Model.RegistrationModel;
import codeplac.codeplac.Service.RegistrationService;

@RestController
@RequestMapping("/registration")
public class RegistrationController {

  @Autowired
  RegistrationService registrationService;

  @PostMapping("/create")
  public ResponseEntity<RegistrationModel> criarInscricao(@RequestBody RegistrationModel registration) {
    return new ResponseEntity<>(registrationService.createRegistration(registration), HttpStatus.CREATED);
  }

  @GetMapping("/list")
  public ResponseEntity<List<RegistrationModel>> listarInscricoes() {
    return new ResponseEntity<>(registrationService.getAllRegistrations(), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<RegistrationModel> obterInscricao(@PathVariable int id) {
    try {
      return new ResponseEntity<>(registrationService.getRegistrationById(id), HttpStatus.OK);
    } catch (Excecao e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
    }
  }

  @PutMapping("/modify/{id}")
  public ResponseEntity<RegistrationModel> modificarInscricao(
      @PathVariable int id,
      @RequestBody RegistrationModel registration) {
    try {
      return new ResponseEntity<>(registrationService.updateRegistration(id, registration), HttpStatus.OK);
    } catch (Excecao e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
    }
  }

  @DeleteMapping("/destroy/{id}")
  public ResponseEntity<Void> apagarInscricao(@PathVariable int id) {
    try {
      boolean deleted = registrationService.deleteRegistration(id);
      if (deleted) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
    } catch (Excecao e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
    }
  }
}

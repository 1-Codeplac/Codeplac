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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import codeplac.codeplac.DTO.ResponsesDTO.User.UserResponse;
import codeplac.codeplac.Exception.Excecao;
import codeplac.codeplac.Model.UsersModel;
import codeplac.codeplac.Service.UsersService;

@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UsersService usersService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> cadastrarUsuario(@RequestBody UsersModel user) {
        try {
            UserResponse savedUser = usersService.createUser(user);

            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } catch (Excecao e) {
            // 1. Trata exceções LÓGICAS (como CPF já existe) lançadas pelo nosso Service
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
             // 2. Trata exceções INESPERADAS/BANCO DE DADOS (como Email duplicado) que causam o 500 e o HTML
             // Verifica se a exceção contém a pista de violação de restrição UNIQUE
            if (e.getMessage() != null && e.getMessage().contains("Duplicate entry")) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "E-mail ou CPF já registrados no sistema.", e);
            }
            // Para outras falhas inesperadas (como problema de conexão com o DB, etc.)
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro interno: Não foi possível processar o registro.", e);
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<UserResponse>> listarUsuarios() {
        List<UserResponse> users = usersService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{cpf}")
    public ResponseEntity<UserResponse> obterUsuario(@PathVariable String cpf) {
        try {
            UserResponse user = usersService.getUserByCpf(cpf);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Excecao e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    @PutMapping("/modify/{cpf}")
    public ResponseEntity<UserResponse> modificarUsuario(
            @PathVariable String cpf,
            @RequestParam String field,
            @RequestParam String password,
            @RequestBody UsersModel user) {
        try {
            UserResponse updatedUser = usersService.updateUser(cpf, user, field, password);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (Excecao e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @DeleteMapping("/destroy/{cpf}")
    public ResponseEntity<Void> apagarUsuario(@PathVariable String cpf) {
        try {
            boolean deleted = usersService.deleteUser(cpf);
            if (deleted) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Excecao e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }
}
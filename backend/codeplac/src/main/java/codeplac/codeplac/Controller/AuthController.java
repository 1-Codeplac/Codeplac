package codeplac.codeplac.Controller; // Define o pacote onde esta classe está localizada

import org.springframework.beans.factory.annotation.Autowired; // Importa a anotação @Autowired para injeção automática de dependências do Spring
import org.springframework.http.HttpStatus; // Importa a classe HttpStatus que contém os códigos de status HTTP (ex: 200 OK, 401 UNAUTHORIZED)
import org.springframework.http.ResponseEntity; // Importa a classe ResponseEntity, que representa a resposta HTTP completa (corpo, status, headers)
import org.springframework.web.bind.annotation.PostMapping; // Importa a anotação @PostMapping, usada para mapear requisições HTTP POST a um método específico
import org.springframework.web.bind.annotation.RequestBody; // Importa a anotação @RequestBody, usada para indicar que um parâmetro do método deve ser preenchido com o corpo da requisição
import org.springframework.web.bind.annotation.RequestMapping; // Importa a anotação @RequestMapping, usada para definir o prefixo de rota para todos os endpoints da classe
import org.springframework.web.bind.annotation.RestController; // Importa a anotação @RestController, que marca a classe como um controlador REST (respostas JSON)
import org.springframework.web.server.ResponseStatusException; // Importa a exceção ResponseStatusException, que permite lançar erros HTTP personalizados com código e mensagem

import codeplac.codeplac.DTO.RequestsDTO.Auth.LoginRequest; // Importa a classe LoginRequest, que representa os dados enviados pelo usuário na requisição de login
import codeplac.codeplac.DTO.ResponsesDTO.Auth.LoginResponse; // Importa a classe LoginResponse, que representa os dados retornados ao usuário após o login
import codeplac.codeplac.Exception.Excecao; // Importa a exceção personalizada Excecao, que pode ser usada para sinalizar falhas de autenticação
import codeplac.codeplac.Service.AuthService; // Importa o serviço AuthService, responsável por realizar a lógica de autenticação

@RestController // Indica que essa classe é um controlador REST, e que os métodos retornam
                // respostas JSON
@RequestMapping("/auth") // Define o prefixo "/auth" para todas as rotas desta classe
public class AuthController {

  @Autowired // Injeta automaticamente uma instância de AuthService
  private AuthService authService; // Mapeia requisições POST para "/auth/login"

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
    try {
      // Chama o método de autenticação do serviço, passando matrícula e senha
      String token = authService.authenticate(loginRequest.getCpf(), loginRequest.getPassword()); // Retorna uma
                                                                                                  // resposta HTTP 200
                                                                                                  // OK com o
                                                                                                  // LoginResponse
                                                                                                  // contendo a
                                                                                                  // matrícula e o token

      return ResponseEntity.ok(new LoginResponse(loginRequest.getCpf(), token));
    } catch (Excecao e) {
      // Se ocorrer uma exceção de autenticação, retorna erro 401 UNAUTHORIZED com a
      // mensagem da exceção
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage(), e);
    }
  }
}

package codeplac.codeplac.Controller; // Define o pacote onde esta classe está localizada

import java.util.Map; // Importa a anotação @Autowired para injeção automática de dependências do Spring

import org.springframework.beans.factory.annotation.Autowired; // Importa a classe HttpStatus que contém os códigos de status HTTP (ex: 200 OK, 401 UNAUTHORIZED)
import org.springframework.http.HttpStatus; // Importa a classe ResponseEntity, que representa a resposta HTTP completa (corpo, status, headers)
import org.springframework.http.ResponseEntity; // Importa a anotação @PostMapping, usada para mapear requisições HTTP POST a um método específico
import org.springframework.mail.MailException; // Importa a anotação @RequestBody, usada para indicar que um parâmetro do método deve ser preenchido com o corpo da requisição
import org.springframework.web.bind.annotation.PostMapping; // Importa a anotação @RequestMapping, usada para definir o prefixo de rota para todos os endpoints da classe
import org.springframework.web.bind.annotation.RequestBody; // Importa a anotação @RestController, que marca a classe como um controlador REST (respostas JSON)
import org.springframework.web.bind.annotation.RequestMapping; // Importa a exceção ResponseStatusException, que permite lançar erros HTTP personalizados com código e mensagem
import org.springframework.web.bind.annotation.RequestParam; // NOVA LINHA
import org.springframework.web.bind.annotation.RestController; // NOVA LINHA
import org.springframework.web.server.ResponseStatusException; // NOVA LINHA

import codeplac.codeplac.DTO.RequestsDTO.Auth.LoginRequest; // Importa a classe LoginRequest, que representa os dados enviados pelo usuário na requisição de login
import codeplac.codeplac.DTO.ResponsesDTO.Auth.LoginResponse; // Importa a classe LoginResponse, que representa os dados retornados ao usuário após o login
import codeplac.codeplac.Exception.Excecao; // Importa a exceção personalizada Excecao, que pode ser usada para sinalizar falhas de autenticação
import codeplac.codeplac.Service.AuthService; // Importa o serviço AuthService, responsável por realizar a lógica de autenticação
import codeplac.codeplac.Service.PasswordResetService; // NOVA LINHA

@RestController // Indica que essa classe é um controlador REST, e que os métodos retornam

@RequestMapping("/auth") // Define o prefixo "/auth" para todas as rotas desta classe
public class AuthController {

  @Autowired // Injeta automaticamente uma instância de AuthService
  private AuthService authService;

  @Autowired // NOVA LINHA
  private PasswordResetService passwordResetService; // NOVA LINHA

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
    try {

      String token = authService.authenticate(loginRequest.getCpf(), loginRequest.getPassword()); // Retorna uma

      return ResponseEntity.ok(new LoginResponse(loginRequest.getCpf(), token));
    } catch (Excecao e) {
      // Se ocorrer uma exceção de autenticação, retorna erro 401 UNAUTHORIZED com a
      // mensagem da exceção
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage(), e);
    }
  }

  @PostMapping("/forgot-password") // NOVA LINHA
  public ResponseEntity<Void> forgotPassword(@RequestBody Map<String, String> request) { // NOVA LINHA
    String cpf = request.get("cpf"); // NOVA LINHA

    try { // NOVA LINHA
      // A URL base do seu frontend onde estará a página de redefinição // NOVA LINHA
      String appUrl = "https://www.codeplac.com.br"; // NOVA LINHA

      passwordResetService.createPasswordResetToken(cpf, appUrl); // NOVA LINHA

      // Retorna um status 200 OK, mesmo que o CPF não exista, por segurança, mas o
      // Service já tratou a exceção. // NOVA LINHA
      return ResponseEntity.ok().build(); // NOVA LINHA
    } catch (Excecao e) { // NOVA LINHA
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e); // NOVA LINHA
    } catch (MailException e) { // NOVA LINHA
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
          "Erro ao enviar e-mail. Verifique as configurações.", e); // NOVA LINHA
    } // NOVA LINHA
  } // NOVA LINHA

  @PostMapping("/reset-password") // NOVA LINHA
  public ResponseEntity<Void> resetPassword( // NOVA LINHA
      @RequestParam("token") String token, // NOVA LINHA
      @RequestBody Map<String, String> request) { // NOVA LINHA

    String newPassword = request.get("newPassword"); // NOVA LINHA

    if (newPassword == null || newPassword.isEmpty()) { // NOVA LINHA
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A nova senha não pode ser vazia."); // NOVA LINHA
    } // NOVA LINHA

    try { // NOVA LINHA
      passwordResetService.resetPassword(token, newPassword); // NOVA LINHA
      return ResponseEntity.ok().build(); // NOVA LINHA
    } catch (Excecao e) { // NOVA LINHA
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e); // NOVA LINHA
    } // NOVA LINHA
  } // NOVA LINHA
}
package codeplac.codeplac.Controller; // Define o pacote onde esta classe está localizada

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import codeplac.codeplac.DTO.RequestsDTO.Auth.LoginRequest;
import codeplac.codeplac.Exception.Excecao;
import codeplac.codeplac.Service.AuthService;
import codeplac.codeplac.Service.PasswordResetService;

@RestController // Indica que essa classe é um controlador REST, e que os métodos retornam dados
                // (JSON)
@RequestMapping("/auth") // Define o prefixo "/auth" para todas as rotas desta classe
public class AuthController {

  @Autowired // Injeta automaticamente uma instância de AuthService
  private AuthService authService;

  @Autowired // NOVA LINHA
  private PasswordResetService passwordResetService; // NOVA LINHA

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    try {
      // Chama o serviço de autenticação
      Map<String, String> userData = authService.authenticate(loginRequest.getCpf(), loginRequest.getPassword());

      // Construímos um Map de resposta direto para garantir que chaves idênticas
      // cheguem ao React
      Map<String, String> response = new java.util.HashMap<>();
      response.put("cpf", loginRequest.getCpf());
      response.put("token", userData.get("token"));
      response.put("role", userData.get("tipoUsuario")); // Mapeia 'tipoUsuario' do back para 'role' do front!

      return ResponseEntity.ok(response);

    } catch (Excecao e) {
      // Retorna 401 se os dados forem inválidos
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
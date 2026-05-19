package codeplac.codeplac.Controller;

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
import codeplac.codeplac.DTO.ResponsesDTO.Auth.LoginResponse;
import codeplac.codeplac.Exception.Excecao;
import codeplac.codeplac.Service.AuthService;
import codeplac.codeplac.Service.PasswordResetService;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  private AuthService authService;

  @Autowired
  private PasswordResetService passwordResetService;

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    try {

      // VALIDAÇÃO
      if (loginRequest.getCpf() == null || loginRequest.getCpf().isBlank()) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "CPF não enviado!"));
      }

      if (loginRequest.getPassword() == null || loginRequest.getPassword().isBlank()) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Senha não enviada!"));
      }

      // AUTENTICAÇÃO
      Map<String, String> userData = authService.authenticate(loginRequest.getCpf(), loginRequest.getPassword());

      String token = userData.get("token") != null ? userData.get("token") : "";
      String role = userData.get("tipoUsuario") != null ? userData.get("tipoUsuario") : "PARTICIPANT";

      LoginResponse response = new LoginResponse(loginRequest.getCpf(), token, role);
      return ResponseEntity.ok(response);

    } catch (Excecao e) {
      // Retorna erro de senha ou CPF não encontrado direto pro front
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", e.getMessage()));

    } catch (Exception e) {
      // DEDO-DURO: Captura a falha do banco de dados e joga na cara do Frontend!
      String causa = e.getCause() != null ? e.getCause().toString() : "Nenhuma causa detectada";
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Map.of("message", "🚨 ERRO FATAL: " + e.getMessage() + " | CAUSA: " + causa));
    }
  }

  @PostMapping("/forgot-password")
  public ResponseEntity<Void> forgotPassword(@RequestBody Map<String, String> request) {

    String cpf = request.get("cpf");

    try {

      String appUrl = "https://www.codeplac.com.br";

      passwordResetService.createPasswordResetToken(cpf, appUrl);

      return ResponseEntity.ok().build();

    } catch (Excecao e) {

      throw new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          e.getMessage(),
          e);

    } catch (MailException e) {

      throw new ResponseStatusException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Erro ao enviar e-mail. Verifique as configurações.",
          e);
    }
  }

  @PostMapping("/reset-password")
  public ResponseEntity<Void> resetPassword(
      @RequestParam("token") String token,
      @RequestBody Map<String, String> request) {

    String newPassword = request.get("newPassword");

    if (newPassword == null || newPassword.isEmpty()) {

      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST,
          "A nova senha não pode ser vazia.");
    }

    try {

      passwordResetService.resetPassword(token, newPassword);

      return ResponseEntity.ok().build();

    } catch (Excecao e) {

      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST,
          e.getMessage(),
          e);
    }
  }
}
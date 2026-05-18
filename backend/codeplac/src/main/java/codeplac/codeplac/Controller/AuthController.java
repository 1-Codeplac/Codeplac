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
  @SuppressWarnings("CallToPrintStackTrace")
  public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {

    try {

      // DEBUG COMPLETO
      System.out.println("=================================");
      System.out.println("LOGIN RECEBIDO");
      System.out.println("CPF: " + loginRequest.getCpf());
      System.out.println("PASSWORD: " + loginRequest.getPassword());
      System.out.println("=================================");

      // VALIDAÇÃO
      if (loginRequest.getCpf() == null || loginRequest.getCpf().isBlank()) {
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST,
            "CPF não enviado!");
      }

      if (loginRequest.getPassword() == null || loginRequest.getPassword().isBlank()) {
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST,
            "Senha não enviada!");
      }

      // AUTENTICAÇÃO
      Map<String, String> userData = authService.authenticate(
          loginRequest.getCpf(),
          loginRequest.getPassword());

      System.out.println("AUTH OK");

      String token = userData.get("token") != null
          ? userData.get("token")
          : "";

      String role = userData.get("tipoUsuario") != null
          ? userData.get("tipoUsuario")
          : "PARTICIPANT";

      LoginResponse response = new LoginResponse(
          loginRequest.getCpf(),
          token,
          role);

      return ResponseEntity.ok(response);

    } catch (Excecao e) {

      System.out.println("ERRO DE AUTENTICAÇÃO:");
      e.printStackTrace();

      throw new ResponseStatusException(
          HttpStatus.UNAUTHORIZED,
          e.getMessage(),
          e);

    } catch (Exception e) {

      System.out.println("ERRO INTERNO GERAL:");
      e.printStackTrace();

      throw new ResponseStatusException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Erro interno no processamento do login.",
          e);
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
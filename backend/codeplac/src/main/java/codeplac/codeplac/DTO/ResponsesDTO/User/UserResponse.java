package codeplac.codeplac.DTO.ResponsesDTO.User;

import codeplac.codeplac.Enum.UserTipo;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserResponse {
  private final String email;
  private final String nome;
  private final String sobrenome;
  private final String telefone;
  private final String cpf;
  private final UserTipo tipoUsuario;
  private final String refreshToken;
  private final String accessToken;
}
package codeplac.codeplac.DTO.RequestsDTO.User;

import codeplac.codeplac.Enum.UserTipo;
import lombok.Data;

@Data
public class UserCreateRequest {

    private String cpf;
    private String nome;
    private String sobrenome;
    private String email;
    private String telefone;
    private String senha;
    private UserTipo tipoUsuario;
}

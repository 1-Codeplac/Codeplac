package codeplac.codeplac.DTO.ResponsesDTO.Auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class LoginResponse {
    private String cpf;
    private String token;
    private String role;
}

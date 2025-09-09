package codeplac.codeplac.DTO.ResponsesDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JunteSeDTO {
    private String nome;
    private String email;
    private String telefone;
    private String curso;
    private boolean vinculo;
    private String motivacao;
}

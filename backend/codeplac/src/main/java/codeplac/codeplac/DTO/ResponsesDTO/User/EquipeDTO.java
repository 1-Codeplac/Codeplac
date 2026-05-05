package codeplac.codeplac.DTO.ResponsesDTO.User;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EquipeDTO {

    private Long id_equipe;
    private LocalDateTime data_inscricao;

    @NotBlank
    private String nome_equipe;

    @NotBlank
    private String nome_lider;

    @NotBlank
    private String membro2;

    @NotBlank
    private String membro3;

    @NotBlank
    private String membro4;

    private String membro5;
    private String membro6;
}

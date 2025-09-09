package codeplac.codeplac.Model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "equipe_model")
public class EquipeModel{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_equipe")
    private Long idEquipe;

    @Column(name = "data_inscricao")
    private LocalDateTime data_inscricao;

    @Column(length = 100)
    private String nome_equipe;

    @Column(length = 100)
    private String nome_lider;

    @Column(length = 80, nullable = false)
    private String membro2;

    @Column(length = 80, nullable = false)
    private String membro3;

    @Column(length = 80, nullable = false)
    private String membro4;

    @Column(length = 80)
    private String membro5;

    @Column(length = 80)
    private String membro6;
}


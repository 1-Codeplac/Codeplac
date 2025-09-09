package codeplac.codeplac.Model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "JuizCodigo")
public class JuizCodigoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_equipe", length = 100, nullable = false)
    private String nomeEquipe;

    @Column(name = "numero_codigo", nullable = false)
    private Integer numeroCodigo;

    @Column(name = "nome_lider", length = 100, nullable = false)
    private String nomeLider;

    @Lob
    @Column(name = "codigo", nullable = false)
    private String codigo;

    @Column(name = "data_envio", nullable = false, updatable = false)
    private LocalDateTime dataEnvio;

    @PrePersist
    protected void onCreate() {
        this.dataEnvio = LocalDateTime.now();
    }
}

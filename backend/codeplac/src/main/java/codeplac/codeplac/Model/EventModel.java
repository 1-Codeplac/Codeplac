package codeplac.codeplac.Model;

import java.time.LocalDate;
import java.util.List;

import codeplac.codeplac.Enum.EventPeriodo;
import codeplac.codeplac.Enum.EventTipo;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "evento")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EventModel {
  @Id
  @Column(name = "id_evento")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int idEvento;

  @Column(name = "ano", columnDefinition = "YEAR")
  private Integer ano;

  @Column(name = "bimestre", length = 2)
  private String bimestre;

  @Column(name = "horario", length = 5)
  private String horario;

  @Column(name = "data_evento", columnDefinition = "DATE")
  private LocalDate dataEvento;

  @Column(name = "nome_evento", length = 100)
  private String nomeEvento;

  @Column(name = "descricao", columnDefinition = "TEXT")
  private String descricao;

  @Column(name = "lugar")
  private String lugar;

  @Enumerated(EnumType.STRING)
  @Column(name = "periodo")
  private EventPeriodo periodo;

  @Enumerated(EnumType.STRING)
  @Column(name = "tipo_evento")
  private EventTipo tipoEvento;

  @OneToMany(mappedBy = "evento")
  private List<RegistrationModel> inscricoes;

  @OneToMany(mappedBy = "evento")
  private List<RankingModel> classificacoes;
}

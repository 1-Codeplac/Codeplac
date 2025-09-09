package codeplac.codeplac.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "classificacao")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RankingModel {
  @Id
  @Column(name = "id_classificacao")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int idClassificacao;

  private float pontuacao;

@ManyToOne
@JoinColumn(name = "equipe_id_equipe", referencedColumnName = "id_equipe")
private EquipeModel equipe;

  @ManyToOne
  @JoinColumn(name = "evento_id_evento", referencedColumnName = "id_evento")
  private EventModel evento;
}

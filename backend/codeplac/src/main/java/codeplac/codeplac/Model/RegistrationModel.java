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
@Table(name = "inscricao")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class RegistrationModel {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_inscricao")
  private int idInscricao;

  @Column(name = "codigo_grupo")
  private String codigoGrupo;

  @ManyToOne
  @JoinColumn(name = "evento_id_Evento")
  private EventModel evento;

  @ManyToOne
  @JoinColumn(name = "usuario_matricula")
  private UsersModel usuario;
}
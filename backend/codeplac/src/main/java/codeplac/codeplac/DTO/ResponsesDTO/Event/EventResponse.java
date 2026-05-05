package codeplac.codeplac.DTO.ResponsesDTO.Event;

import java.time.LocalDate;

import codeplac.codeplac.Enum.EventPeriodo;
import codeplac.codeplac.Enum.EventTipo;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class EventResponse {
  private int idEvento;
  private String nome;
  private String descricao;
  private Integer ano;
  private String bimestre;
  private LocalDate dataEvento;
  private String lugar;
  private String horario;
  private EventPeriodo periodo;
  private EventTipo tipoEvento;
}

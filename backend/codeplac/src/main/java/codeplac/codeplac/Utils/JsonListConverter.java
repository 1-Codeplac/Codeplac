package codeplac.codeplac.Utils;

import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import codeplac.codeplac.Model.Member;
import jakarta.persistence.AttributeConverter;

public class JsonListConverter implements AttributeConverter<List<Member>, String> {

  private final ObjectMapper objectMapper = new ObjectMapper();

  @Override
  public String convertToDatabaseColumn(List<Member> attribute) {
    try {
      return objectMapper.writeValueAsString(attribute);
    } catch (Exception e) {
      throw new RuntimeException("Erro ao converter lista de membros para JSON", e);
    }
  }

  @Override
  public List<Member> convertToEntityAttribute(String dbData) {
    try {
      return objectMapper.readValue(dbData, new TypeReference<List<Member>>() {
      });
    } catch (Exception e) {
      throw new RuntimeException("Erro ao converter JSON para lista de membros", e);
    }
  }
}

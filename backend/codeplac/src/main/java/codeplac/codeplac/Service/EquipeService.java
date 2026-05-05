package codeplac.codeplac.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import codeplac.codeplac.DTO.ResponsesDTO.User.EquipeDTO;
import codeplac.codeplac.Model.EquipeModel;
import codeplac.codeplac.Repository.EquipeRepository;

@Service
public class EquipeService {

    @Autowired
    private EquipeRepository equipeRepository;

    public EquipeDTO criarEquipe(EquipeDTO dto) {
        EquipeModel equipe = dtoToModel(dto);
        equipe.setData_inscricao(LocalDateTime.now());
        EquipeModel saved = equipeRepository.save(equipe);
        return modelToDTO(saved);
    }

    public List<EquipeDTO> listarEquipes() {
        return equipeRepository.findAll()
                .stream()
                .map(this::modelToDTO)
                .collect(Collectors.toList());
    }

    private EquipeModel dtoToModel(EquipeDTO dto) {
        EquipeModel model = new EquipeModel();
        model.setIdEquipe(dto.getId_equipe());
        model.setNome_equipe(dto.getNome_equipe());
        model.setNome_lider(dto.getNome_lider());
        model.setMembro2(dto.getMembro2());
        model.setMembro3(dto.getMembro3());
        model.setMembro4(dto.getMembro4());
        model.setMembro5(dto.getMembro5());
        model.setMembro6(dto.getMembro6());
        return model;
    }

    private EquipeDTO modelToDTO(EquipeModel model) {
        EquipeDTO dto = new EquipeDTO();
        dto.setId_equipe(model.getIdEquipe());
        dto.setData_inscricao(model.getData_inscricao());
        dto.setNome_equipe(model.getNome_equipe());
        dto.setNome_lider(model.getNome_lider());
        dto.setMembro2(model.getMembro2());
        dto.setMembro3(model.getMembro3());
        dto.setMembro4(model.getMembro4());
        dto.setMembro5(model.getMembro5());
        dto.setMembro6(model.getMembro6());
        return dto;
    }
}

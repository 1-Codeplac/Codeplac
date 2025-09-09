package codeplac.codeplac.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import codeplac.codeplac.Exception.Excecao;
import codeplac.codeplac.Model.RankingModel;
import codeplac.codeplac.Repository.RankingRepository;

@Service
public class RankingService {

  @Autowired
  private RankingRepository rankingRepository;

  public RankingModel createRanking(RankingModel rankingModel) {
    return rankingRepository.save(rankingModel);
  }

  public List<RankingModel> getAllRankings() {
    return rankingRepository.findAll();
  }

  public RankingModel getRankingById(int id) throws Excecao {
    Optional<RankingModel> optionalRanking = rankingRepository.findById(id);
    if (optionalRanking.isPresent()) {
      return optionalRanking.get();
    }

    throw new Excecao("Classificação não encontrada com id: " + id);
  }

  public RankingModel updateRanking(int id, RankingModel ranking) throws Excecao {
    Optional<RankingModel> optionalRanking = rankingRepository.findById(id);

    if (optionalRanking.isPresent()) {
      RankingModel existingRanking = optionalRanking.get();

      if (ranking.getPontuacao() != 0.0f)
        existingRanking.setPontuacao(ranking.getPontuacao());

      return rankingRepository.save(existingRanking);
    } else {
      throw new Excecao("Classificação não encontrada com id: " + id);
    }
  }

  public boolean deleteRegistration(int id) throws Excecao {
    if (rankingRepository.existsById(id)) {
      rankingRepository.deleteById(id);
      return true;
    }

    throw new Excecao("Classificação não encontrada com id: " + id);
  }
}

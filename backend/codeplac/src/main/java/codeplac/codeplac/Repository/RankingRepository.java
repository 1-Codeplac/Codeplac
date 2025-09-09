package codeplac.codeplac.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import codeplac.codeplac.Model.RankingModel;

public interface RankingRepository extends JpaRepository<RankingModel, Integer> {

}

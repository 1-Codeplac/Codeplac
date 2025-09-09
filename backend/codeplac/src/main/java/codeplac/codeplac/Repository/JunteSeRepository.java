package codeplac.codeplac.Repository;

import codeplac.codeplac.Model.JunteSeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JunteSeRepository extends JpaRepository<JunteSeModel, Integer> {
}
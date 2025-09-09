package codeplac.codeplac.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import codeplac.codeplac.Model.RegistrationModel;

public interface RegistrationRepository extends JpaRepository<RegistrationModel, Integer> {

}
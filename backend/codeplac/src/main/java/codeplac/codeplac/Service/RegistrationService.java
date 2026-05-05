package codeplac.codeplac.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import codeplac.codeplac.Exception.Excecao;
import codeplac.codeplac.Model.RegistrationModel;
import codeplac.codeplac.Repository.RegistrationRepository;

@Service
public class RegistrationService {

  @Autowired
  private RegistrationRepository registrationRepository;

  public RegistrationModel createRegistration(RegistrationModel registrationModel) {
    return registrationRepository.save(registrationModel);
  }

  public List<RegistrationModel> getAllRegistrations() {
    return registrationRepository.findAll();
  }

  public RegistrationModel getRegistrationById(int id) throws Excecao {
    Optional<RegistrationModel> registration = registrationRepository.findById(id);
    if (registration.isPresent()) {
      return registration.get();
    }

    throw new Excecao("Inscrição não encontrado com id: " + id);
  }

  public RegistrationModel updateRegistration(int id, RegistrationModel registration) throws Excecao {
    Optional<RegistrationModel> optionalRegistration = registrationRepository.findById(id);

    if (optionalRegistration.isPresent()) {
      RegistrationModel existingRegistration = optionalRegistration.get();

      if (registration.getCodigoGrupo() != null)
        existingRegistration.setCodigoGrupo(registration.getCodigoGrupo());

      return registrationRepository.save(existingRegistration);
    } else {
      throw new Excecao("Inscrição não encontrado com id: " + id);
    }
  }

  public boolean deleteRegistration(int id) throws Excecao {
    if (registrationRepository.existsById(id)) {
      registrationRepository.deleteById(id);
      return true;
    }

    throw new Excecao("Inscrição não encontrado com id: " + id);
  }
}

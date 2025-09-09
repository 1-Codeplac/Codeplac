package codeplac.codeplac.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import codeplac.codeplac.Model.JuizCodigoModel;
import codeplac.codeplac.Repository.JuizCodigoRepository;

@RestController
@RequestMapping("/juizcodigo")
@CrossOrigin(origins = "*") // Permitir requisições do frontend
public class JuizCodigoController {

    @Autowired
    private JuizCodigoRepository repository;

    @PostMapping
    public JuizCodigoModel receberCodigo(@RequestBody JuizCodigoModel dados) {
        return repository.save(dados);
    }
}

package codeplac.codeplac.Service;

<<<<<<< HEAD
=======
import java.util.HashMap;
import java.util.Map;

>>>>>>> upstream/main
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import codeplac.codeplac.Exception.Excecao;
import codeplac.codeplac.Model.UsersModel;
import codeplac.codeplac.Repository.UsersRepository;
import codeplac.codeplac.Security.TokenService;

@Service
public class AuthService {

    @Autowired
    private UsersRepository usersRepository; // Injeção de dependência

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

<<<<<<< HEAD
    public String authenticate(String cpf, String password) throws Excecao {
        String normalizedCpf = cpf.replaceAll("[^0-9]", "");
        System.out.println("cpf: " + normalizedCpf);
        UsersModel user = usersRepository.findByCpf(normalizedCpf)
                .orElseThrow(() -> new Excecao("Usuário ou senha inválidos"));
=======
    public Map<String, String> authenticate(String cpf, String password) throws Excecao {
        System.out.println("cpf: " + cpf); // Log da matrícula
        UsersModel user = usersRepository.findByCpf(cpf).get();

        if (user == null) {
            System.out.println("Usuário não encontrado!"); // Log se o usuário não existir
            throw new Excecao("Usuário ou senha inválidos");
        }
>>>>>>> upstream/main

        if (!passwordEncoder.matches(password, user.getSenha())) {
            System.out.println("Senha incorreta!"); // Log se a senha não corresponder
            throw new Excecao("Usuário ou senha inválidos");
        }

<<<<<<< HEAD
        return tokenService.generateToken(user);
=======
        Map<String, String> response = new HashMap<>();
        response.put("tipoUsuario", user.getTipoUsuario().name());
        response.put("token", tokenService.generateToken(user));

        return response;
>>>>>>> upstream/main
    }

}

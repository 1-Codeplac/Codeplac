package codeplac.codeplac.Service;

import java.util.HashMap;
import java.util.Map;

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
    private UsersRepository usersRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

    public Map<String, String> authenticate(String cpf, String password) throws Excecao {

        // VALIDAÇÃO
        if (cpf == null || cpf.isBlank()) {
            throw new Excecao("CPF inválido");
        }

        if (password == null || password.isBlank()) {
            throw new Excecao("Senha inválida");
        }

        // NORMALIZA CPF
        String normalizedCpf = cpf.replaceAll("[^0-9]", "");

        System.out.println("Tentativa de login para o CPF: " + normalizedCpf);

        // BUSCA USUÁRIO
        UsersModel user = usersRepository.findByCpf(normalizedCpf)
                .orElseThrow(() -> new Excecao("Usuário ou senha inválidos"));

        System.out.println("Usuário encontrado: " + user.getNome());

        // VERIFICA SENHA
        if (!passwordEncoder.matches(password, user.getSenha())) {

            System.out.println("Senha incorreta!");

            throw new Excecao("Usuário ou senha inválidos");
        }

        System.out.println("Senha correta!");

        // GERA TOKEN
        String token = tokenService.generateToken(user);

        System.out.println("TOKEN GERADO");

        // RESPOSTA
        Map<String, String> response = new HashMap<>();

        response.put("token", token);
        response.put("tipoUsuario", user.getTipoUsuario().name());

        return response;
    }
}
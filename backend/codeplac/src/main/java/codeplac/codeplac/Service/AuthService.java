package codeplac.codeplac.Service;

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

    public String authenticate(String cpf, String password) throws Excecao {
        System.out.println("cpf: " + cpf); // Log da matrícula
        UsersModel user = usersRepository.findByCpf(cpf).get();

        if (user == null) {
            System.out.println("Usuário não encontrado!"); // Log se o usuário não existir
            throw new Excecao("Usuário ou senha inválidos");
        }

        if (!passwordEncoder.matches(password, user.getSenha())) {
            System.out.println("Senha incorreta!"); // Log se a senha não corresponder
            throw new Excecao("Usuário ou senha inválidos");
        }

        return tokenService.generateToken(user);
    }

}

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
    private UsersRepository usersRepository; // Injeção de dependência do repositório de usuários

    @Autowired
    private PasswordEncoder passwordEncoder; // Injeção para verificar senhas criptografadas

    @Autowired
    private TokenService tokenService; // Injeção para geração de tokens JWT

    /**
     * Realiza a autenticação do usuário e retorna um Map contendo o token e o tipo
     * de usuário.
     */
    public Map<String, String> authenticate(String cpf, String password) throws Excecao {
        // Normaliza o CPF removendo caracteres não numéricos
        String normalizedCpf = cpf.replaceAll("[^0-9]", "");
        System.out.println("Tentativa de login para o cpf: " + normalizedCpf);

        // Busca o usuário no banco de dados
        UsersModel user = usersRepository.findByCpf(normalizedCpf)
                .orElseThrow(() -> new Excecao("Usuário ou senha inválidos"));

        // Verifica se a senha informada corresponde ao hash gravado no banco
        if (!passwordEncoder.matches(password, user.getSenha())) {
            System.out.println("Senha incorreta!");
            throw new Excecao("Usuário ou senha inválidos");
        }

        // Gera o token e prepara a resposta
        String token = tokenService.generateToken(user);

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("tipoUsuario", user.getTipoUsuario().name());

        return response;
    }
}
package codeplac.codeplac.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import codeplac.codeplac.DTO.ResponsesDTO.User.UserResponse;
import codeplac.codeplac.Exception.Excecao;
import codeplac.codeplac.Model.UsersModel;
import codeplac.codeplac.Repository.UsersRepository;
import codeplac.codeplac.Security.TokenService;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

    public UserResponse createUser(UsersModel user) throws Excecao {
        // Normaliza o CPF do novo usuário para garantir salvamento limpo
        String normalizedCpf = user.getCpf().replaceAll("[^0-9]", "");

        if (usersRepository.existsById(normalizedCpf)) {
            throw new Excecao("Usuário com CPF já existe.");
        }

        UsersModel newUser = new UsersModel();
        newUser.setCpf(normalizedCpf);
        newUser.setEmail(user.getEmail());
        newUser.setNome(user.getNome());
        newUser.setSobrenome(user.getSobrenome());
        newUser.setTelefone(user.getTelefone());
        newUser.setSenha(passwordEncoder.encode(user.getSenha()));
        newUser.setTipoUsuario(user.getTipoUsuario());

        // Gera um hash_id único
        newUser.setHashId(UUID.randomUUID().toString());

        String refreshToken = UUID.randomUUID().toString();
        newUser.setRefreshToken(refreshToken);

        String accessToken = tokenService.generateAndStoreAccessToken(newUser);
        newUser.setAccessToken(accessToken);

        usersRepository.save(newUser);

        return createUserResponse(newUser);
    }

    public List<UserResponse> getAllUsers() {
        List<UsersModel> usersModelList = usersRepository.findAll();
        List<UserResponse> usersResponseList = new ArrayList<>();

        for (UsersModel userModel : usersModelList) {
            usersResponseList.add(createUserResponse(userModel));
        }

        return usersResponseList;
    }

    public UserResponse getUserByCpf(String cpf) throws Excecao {
        // CORREÇÃO: Limpa pontos e traços do CPF antes de buscar no banco
        String normalizedCpf = cpf.replaceAll("[^0-9]", "");

        Optional<UsersModel> optionalUser = usersRepository.findByCpf(normalizedCpf);
        if (optionalUser.isPresent()) {
            return createUserResponse(optionalUser.get());
        } else {
            throw new Excecao("Usuário não encontrado com CPF: " + normalizedCpf);
        }
    }

    public boolean deleteUser(String cpf) throws Excecao {
        // CORREÇÃO: Limpa pontos e traços do CPF antes de deletar
        String normalizedCpf = cpf.replaceAll("[^0-9]", "");

        if (usersRepository.existsById(normalizedCpf)) {
            usersRepository.deleteById(normalizedCpf);
            return true;
        } else {
            throw new Excecao("Usuário não encontrado com CPF: " + normalizedCpf);
        }
    }

    /**
     * Atualiza um campo específico do usuário após validar a senha atual.
     */
    public UserResponse updateUser(String cpf, UsersModel user, String field, String password) throws Excecao {
        // CORREÇÃO: Limpa pontos e traços do CPF antes de buscar para atualizar
        String normalizedCpf = cpf.replaceAll("[^0-9]", "");

        UsersModel existingUser = usersRepository.findByCpf(normalizedCpf)
                .orElseThrow(() -> new Excecao("Usuário não encontrado com CPF: " + normalizedCpf));

        // Validação de segurança: exige a senha atual para qualquer alteração
        if (!passwordEncoder.matches(password, existingUser.getSenha())) {
            throw new Excecao("Senha incorreta.");
        }

        // Lógica de atualização baseada no campo informado
        switch (field) {
            case "email" -> {
                if (isValid(user.getEmail()))
                    existingUser.setEmail(user.getEmail());
            }
            case "nome" -> {
                if (isValid(user.getNome()))
                    existingUser.setNome(user.getNome());
            }
            case "sobrenome" -> {
                if (isValid(user.getSobrenome()))
                    existingUser.setSobrenome(user.getSobrenome());
            }
            case "telefone" -> {
                if (isValid(user.getTelefone()))
                    existingUser.setTelefone(user.getTelefone());
            }
            case "senha" -> {
                if (isValid(user.getSenha())) {
                    existingUser.setSenha(passwordEncoder.encode(user.getSenha()));
                }
            }
            case "tipoUsuario" -> {
                if (user.getTipoUsuario() != null) {
                    existingUser.setTipoUsuario(user.getTipoUsuario());
                }
            }
            default -> throw new Excecao("Campo inválido: " + field);
        }

        usersRepository.save(existingUser);
        return createUserResponse(existingUser);
    }

    private UserResponse createUserResponse(UsersModel user) {
        return new UserResponse(
                user.getEmail(),
                user.getNome(),
                user.getSobrenome(),
                user.getTelefone(),
                user.getCpf(),
                user.getTipoUsuario(),
                user.getRefreshToken(),
                user.getAccessToken());
    }

    private boolean isValid(String value) {
        return value != null && !value.isBlank();
    }
}
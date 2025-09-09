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
        if (usersRepository.existsById(user.getCpf())) {
            throw new Excecao("Usuário com CPF já existe.");
        }

        UsersModel newUser = new UsersModel();
        newUser.setCpf(user.getCpf());
        newUser.setEmail(user.getEmail());
        newUser.setNome(user.getNome());
        newUser.setSobrenome(user.getSobrenome());
        newUser.setTelefone(user.getTelefone());
        newUser.setSenha(passwordEncoder.encode(user.getSenha()));
        newUser.setTipoUsuario(user.getTipoUsuario());

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
        Optional<UsersModel> optionalUser = usersRepository.findByCpf(cpf);
        if (optionalUser.isPresent()) {
            UserResponse userResponse = createUserResponse(optionalUser.get());

            return userResponse;
        } else {
            throw new Excecao("Usuário não encontrado com CPF: " + cpf);
        }
    }

    public boolean deleteUser(String cpf) throws Excecao {
        if (usersRepository.existsById(cpf)) {
            usersRepository.deleteById(cpf);
            return true;
        } else {
            throw new Excecao("Usuário não encontrado com CPF: " + cpf);
        }
    }

    public UserResponse updateUser(String cpf, UsersModel user, String field, String password)
            throws Excecao {
        Optional<UsersModel> optionalUser = usersRepository.findByCpf(cpf);

        if (optionalUser.isPresent()) {
            UsersModel existingUser = optionalUser.get();

            if (!passwordEncoder.matches(password, existingUser.getSenha())) {
                throw new Excecao("Senha incorreta.");
            }

            switch (field) {
                case "email" -> {
                    if (user.getEmail() != null)
                        existingUser.setEmail(user.getEmail());
                }
                case "nome" -> {
                    if (user.getNome() != null)
                        existingUser.setNome(user.getNome());
                }
                case "sobrenome" -> {
                    if (user.getSobrenome() != null)
                        existingUser.setSobrenome(user.getSobrenome());
                }
                case "telefone" -> {
                    if (user.getTelefone() != null)
                        existingUser.setTelefone(user.getTelefone());
                }
                case "senha" -> {
                    if (user.getSenha() != null)
                        existingUser.setSenha(passwordEncoder.encode(user.getSenha()));
                }
                default -> throw new Excecao("Campo inválido: " + field);
            }

            usersRepository.save(existingUser);

            return createUserResponse(existingUser);
        } else {
            throw new Excecao("Usuário não encontrado com CPF: " + cpf);
        }
    }

    private UserResponse createUserResponse(UsersModel user) {

        UserResponse userResponse = new UserResponse(
                user.getEmail(),
                user.getNome(),
                user.getSobrenome(),
                user.getTelefone(),
                user.getCpf(),
                user.getTipoUsuario(),
                user.getRefreshToken(),
                user.getAccessToken());

        return userResponse;
    }

}
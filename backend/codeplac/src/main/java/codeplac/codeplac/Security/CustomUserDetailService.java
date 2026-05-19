package codeplac.codeplac.Security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import codeplac.codeplac.Enum.UserTipo; // Importação adicionada para usar o Enum
import codeplac.codeplac.Model.UsersModel;
import codeplac.codeplac.Repository.UsersRepository;

@Component
public class CustomUserDetailService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailService.class);

    private final UsersRepository repository;

    public CustomUserDetailService(UsersRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String cpf) throws UsernameNotFoundException {
        logger.debug("Tentando carregar usuário com matrícula: {}", cpf);

        // Tenta encontrar o usuário pela matrícula
        UsersModel user = repository.findByCpf(cpf)
                .orElseThrow(() -> {
                    logger.warn("Usuário não encontrado com matrícula: {}", cpf);
                    return new UsernameNotFoundException("Usuário não encontrado com matrícula: " + cpf);
                });

        logger.debug("Usuário encontrado: {}", user.getCpf());

        // CORREÇÃO: Verifica se o tipo de usuário no banco está nulo para evitar o
        // NullPointerException.
        // Se estiver nulo, forçamos o tipo para PARTICIPANT de forma segura.
        UserTipo tipoSeguro = user.getTipoUsuario() != null ? user.getTipoUsuario() : UserTipo.PARTICIPANT;

        // Retorna o UserDetails com a senha e as roles/authorities
        return new org.springframework.security.core.userdetails.User(
                user.getCpf(),
                user.getSenha(),
                tipoSeguro.getAuthorities() // Agora usa a variável blindada contra nulos!
        );
    }
}
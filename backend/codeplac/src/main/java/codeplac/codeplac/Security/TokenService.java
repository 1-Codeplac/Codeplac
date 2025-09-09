package codeplac.codeplac.Security;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;

import codeplac.codeplac.Model.UsersModel;
import codeplac.codeplac.Repository.UsersRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class TokenService {

    private static final Logger logger = LoggerFactory.getLogger(TokenService.class);

    @Value("${api.security.token.secret}")
    private String secret;

    @Value("${api.security.token.access.expiration}")
    private long accessExpiration; // Tempo de expiração do token de acesso em segundos

    @Value("${api.security.token.refresh.expiration}")
    private long refreshExpiration; // Tempo de expiração do refresh token em segundos

    private final UsersRepository userRepository;

    public TokenService(UsersRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Gera o token de acesso
    public String generateToken(UsersModel user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("CodeplaC")
                    .withSubject(user.getCpf())
                    .withExpiresAt(generateAccessExpirationDate())
                    .sign(algorithm);
        } catch (JWTCreationException e) {
            throw new RuntimeException("Erro ao criar o token JWT", e);
        }
    }

    // Gera o refresh token
    public String generateRefreshToken(UsersModel user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("CodeplaC")
                    .withSubject(String.valueOf(user.getCpf()))
                    .withExpiresAt(generateRefreshExpirationDate())
                    .sign(algorithm);
        } catch (JWTCreationException e) {
            throw new RuntimeException("Erro ao criar o token de refresh", e);
        }
    }

    // Valida o token
    public String validateToken(String token, boolean isRefreshToken) {
        if (token == null || token.isEmpty()) {
            logger.warn("Token é nulo ou vazio");
            return null;
        }
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer("CodeplaC")
                    .build(); // Não precisa passar o subject aqui

            DecodedJWT decodedJWT = verifier.verify(token);
            String subject = decodedJWT.getSubject();
            logger.info("Token verificado com sucesso, subject: {}", subject);
            return subject;
        } catch (JWTVerificationException e) {
            logger.error("Falha na verificação do token: {}", e.getMessage());
            return null;
        }
    }

    // Atualiza o refresh token no banco de dados
    @Transactional
    public void updateRefreshToken(String cpf, String refreshToken) {
        userRepository.updateRefreshToken(cpf, refreshToken);
    }

    // Gera a data de expiração para o token de acesso
    private Instant generateAccessExpirationDate() {
        return Instant.now().plusSeconds(accessExpiration);
    }

    // Gera a data de expiração para o refresh token
    private Instant generateRefreshExpirationDate() {
        return Instant.now().plusSeconds(refreshExpiration);
    }

    // Gera e armazena o token de acesso
    @Transactional
    public String generateAndStoreAccessToken(UsersModel user) {
        String accessToken = generateToken(user);
        updateAccessToken(user.getCpf(), accessToken);
        return accessToken;
    }

    // Atualiza o token de acesso no banco de dados
    private void updateAccessToken(String cpf, String accessToken) {
        userRepository.updateAccessToken(cpf, accessToken);
    }
}

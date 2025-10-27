package codeplac.codeplac.Service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import codeplac.codeplac.Exception.Excecao;
import codeplac.codeplac.Model.UsersModel;
import codeplac.codeplac.Repository.UsersRepository;

@Service
public class PasswordResetService {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Constante para a validade do token (1 hora)
    private static final int TOKEN_VALIDITY_HOURS = 1;

    // ---------------------------------------------------------
    // 1. Geração e Envio do Token
    // ---------------------------------------------------------

    /**
     * * Gera um token de redefinição, armazena no banco e envia o e-mail com o
     * link.
     *
     * @param cpf    CPF do usuário solicitante.
     * @param appUrl URL base do frontend (ex: https://www.codeplac.com.br).
     * @throws Excecao Se o usuário não for encontrado.
     */
    @Transactional
    public void createPasswordResetToken(String cpf, String appUrl) throws Excecao {
        // Busca o usuário pelo CPF
        UsersModel user = usersRepository.findByCpf(cpf)
                .orElseThrow(() -> new Excecao("Usuário não encontrado."));

        // 1. Gera um token único
        String token = UUID.randomUUID().toString();
        // 2. Define a expiração (1 hora a partir de agora)
        LocalDateTime expiryDate = LocalDateTime.now().plusHours(TOKEN_VALIDITY_HOURS);

        // 3. Persiste o token e a expiração no banco
        // Nota: O método de repositório 'updateResetToken' é usado para persistência
        usersRepository.updateResetToken(user.getCpf(), token, expiryDate);

        // 4. Envia o e-mail
        sendPasswordResetEmail(user.getEmail(), token, appUrl);
    }

    private void sendPasswordResetEmail(String email, String token, String appUrl) {
        String subject = "CodeplaC - Solicitação de Redefinição de Senha";

        // Monta o link que o usuário deve clicar (assumindo que existe a página
        // reset-password.html)
        String resetUrl = appUrl + "/reset-password.html?token=" + token;

        String message = String.format(
                "Olá!\n\n" +
                        "Você solicitou a redefinição de sua senha na plataforma CodeplaC. " +
                        "Clique no link abaixo para criar uma nova senha. Este link é válido por %d hora(s).\n\n" +
                        "Link de Redefinição: %s\n\n" +
                        "Se você não solicitou esta alteração, ignore este e-mail.\n\n" +
                        "Atenciosamente,\nEquipe CodeplaC",
                TOKEN_VALIDITY_HOURS,
                resetUrl);

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(email);
        mail.setSubject(subject);
        mail.setText(message);
        mailSender.send(mail);
    }

    // ---------------------------------------------------------
    // 2. Redefinição da Senha
    // ---------------------------------------------------------

    /**
     * * Valida o token e redefine a senha do usuário.
     *
     * @param token       O token de segurança enviado por e-mail.
     * @param newPassword A nova senha fornecida pelo usuário.
     * @throws Excecao Se o token for inválido, expirado ou o usuário não for
     *                 encontrado.
     */
    @Transactional
    public void resetPassword(String token, String newPassword) throws Excecao {
        // Busca o usuário pelo token
        UsersModel user = usersRepository.findByResetToken(token)
                .orElseThrow(() -> new Excecao("Token de redefinição inválido ou não encontrado."));

        // 1. Verifica se o token expirou
        if (user.getResetTokenExpiryDate() != null && user.getResetTokenExpiryDate().isBefore(LocalDateTime.now())) {
            // Limpa o token expirado
            user.setResetToken(null);
            user.setResetTokenExpiryDate(null);
            usersRepository.save(user);
            throw new Excecao("Token de redefinição expirado. Solicite uma nova redefinição.");
        }

        // 2. Encripta e define a nova senha
        user.setSenha(passwordEncoder.encode(newPassword));

        // 3. Invalida o token para que não possa ser usado novamente
        user.setResetToken(null);
        user.setResetTokenExpiryDate(null);

        // 4. Salva as alterações
        usersRepository.save(user);
    }
}
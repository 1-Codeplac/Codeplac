package codeplac.codeplac.Model;

import java.time.LocalDateTime;
import java.util.List;

import codeplac.codeplac.Enum.UserTipo;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "usuario")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsersModel {

    @Id
    @Column(name = "cpf", length = 11)
    private String cpf;

    @Column(name = "nome", length = 100)
    private String nome;

    @Column(name = "sobrenome", length = 100)
    private String sobrenome;

    @Column(name = "email", length = 100, nullable = false, unique = true)
    @SuppressWarnings("unused")
    private String email;

    @Column(name = "telefone", length = 19)
    private String telefone;

    @Column(name = "senha", length = 80)
    private String senha;

    @Column(name = "refresh_token", length = 1124)
    private String refreshToken;

    @Column(name = "access_token", length = 1124)
    private String accessToken;

    @Column(name = "reset_token", length = 36)
    private String resetToken; // Novo campo para o token de redefinição

    @Column(name = "reset_token_expiry_date")
    private LocalDateTime resetTokenExpiryDate; // Novo campo para a validade do token

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_usuario", columnDefinition = "ENUM('ADMIN', 'PARTICIPANT')")
    private UserTipo tipoUsuario;

    @OneToMany(mappedBy = "usuario")
    private List<RegistrationModel> inscricoes;
    }


package codeplac.codeplac.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import codeplac.codeplac.Model.UsersModel;
import jakarta.transaction.Transactional;

public interface UsersRepository extends JpaRepository<UsersModel, String> {

    Optional<UsersModel> findByResetToken(String resetToken); // Novo método para buscar pelo token

    @Modifying // ADICIONAR ESTE MÉTODO
    @Transactional
    @Query("UPDATE UsersModel u SET u.resetToken = :token, u.resetTokenExpiryDate = :expiryDate WHERE u.cpf = :cpf")
    void updateResetToken(@Param("cpf") String cpf, @Param("token") String token, @Param("expiryDate") LocalDateTime expiryDate); // ADICIONAR ESTE MÉTODO


    @Modifying
    @Transactional
    @Query("UPDATE UsersModel u SET u.refreshToken = :refreshToken WHERE u.cpf = :cpf")
    void updateRefreshToken(String cpf, String refreshToken);

    Optional<UsersModel> findByCpf(String cpf);

    @Modifying
    @Transactional
    @Query("UPDATE UsersModel u SET u.accessToken = :accessToken WHERE u.cpf = :cpf")
    void updateAccessToken(String cpf, String accessToken);
}


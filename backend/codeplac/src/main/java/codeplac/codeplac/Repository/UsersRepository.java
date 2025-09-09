package codeplac.codeplac.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import codeplac.codeplac.Model.UsersModel;
import jakarta.transaction.Transactional;

public interface UsersRepository extends JpaRepository<UsersModel, String> {

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
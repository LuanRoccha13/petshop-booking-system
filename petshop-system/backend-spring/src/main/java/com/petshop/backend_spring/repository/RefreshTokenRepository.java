package com.petshop.backend_spring.repository;

import com.petshop.backend_spring.domain.RefreshToken;
import com.petshop.backend_spring.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    void deleteByUser(User user);
}

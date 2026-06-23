package com.petshop.backend_spring.service;

import com.petshop.backend_spring.config.JwtProperties;
import com.petshop.backend_spring.domain.RefreshToken;
import com.petshop.backend_spring.domain.User;
import com.petshop.backend_spring.dto.AuthResponse;
import com.petshop.backend_spring.dto.RefreshTokenRequest;
import com.petshop.backend_spring.dto.UserLoginRequest;
import com.petshop.backend_spring.dto.UserRegistrationRequest;
import com.petshop.backend_spring.repository.UserRepository;
import com.petshop.backend_spring.security.JwtProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final RefreshTokenService refreshTokenService;
    private final JwtProperties jwtProperties;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtProvider jwtProvider,
                       RefreshTokenService refreshTokenService,
                       JwtProperties jwtProperties) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
        this.refreshTokenService = refreshTokenService;
        this.jwtProperties = jwtProperties;
    }

    public void register(UserRegistrationRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
    }

    public AuthResponse login(UserLoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Credenciais inválidas"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Credenciais inválidas");
        }

        String token = jwtProvider.generateToken(user.getEmail());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);
        long expiresAt = jwtProvider.getExpirationFromToken(token).toEpochMilli();

        return new AuthResponse(token, refreshToken.getToken(), user.getEmail(), expiresAt);
    }

    public AuthResponse refreshToken(RefreshTokenRequest request) {
        RefreshToken existingRefreshToken = refreshTokenService.findByToken(request.getRefreshToken())
                .orElseThrow(() -> new IllegalArgumentException("Refresh token inválido"));

        refreshTokenService.verifyExpiration(existingRefreshToken);

        User user = existingRefreshToken.getUser();
        String token = jwtProvider.generateToken(user.getEmail());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);
        long expiresAt = jwtProvider.getExpirationFromToken(token).toEpochMilli();

        return new AuthResponse(token, refreshToken.getToken(), user.getEmail(), expiresAt);
    }

    public void logout(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        refreshTokenService.deleteByUser(user);
    }
}

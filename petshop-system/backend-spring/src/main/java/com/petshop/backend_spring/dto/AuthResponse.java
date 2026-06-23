package com.petshop.backend_spring.dto;

public class AuthResponse {

    private String token;
    private String refreshToken;
    private String tokenType = "Bearer";
    private String email;
    private long expiresAt;

    public AuthResponse() {
    }

    public AuthResponse(String token, String refreshToken, String email, long expiresAt) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.email = email;
        this.expiresAt = expiresAt;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(long expiresAt) {
        this.expiresAt = expiresAt;
    }
}

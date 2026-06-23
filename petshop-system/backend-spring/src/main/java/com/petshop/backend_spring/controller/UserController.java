package com.petshop.backend_spring.controller;

import com.petshop.backend_spring.dto.UserResponse;
import com.petshop.backend_spring.mapper.UserMapper;
import com.petshop.backend_spring.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getProfile(Authentication authentication) {
        var user = userService.findByEmail(authentication.getName());
        return ResponseEntity.ok(userMapper.toResponse(user));
    }
}

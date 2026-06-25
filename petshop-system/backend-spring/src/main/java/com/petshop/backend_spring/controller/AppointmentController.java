package com.petshop.backend_spring.controller;

import com.petshop.backend_spring.domain.User;
import com.petshop.backend_spring.dto.AppointmentRequest;
import com.petshop.backend_spring.dto.AppointmentResponse;
import com.petshop.backend_spring.mapper.AppointmentMapper;
import com.petshop.backend_spring.service.AppointmentService;
import com.petshop.backend_spring.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final UserService userService;
    private final AppointmentMapper appointmentMapper;

    public AppointmentController(AppointmentService appointmentService, UserService userService, AppointmentMapper appointmentMapper) {
        this.appointmentService = appointmentService;
        this.userService = userService;
        this.appointmentMapper = appointmentMapper;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AppointmentResponse> createAppointment(@Valid @RequestPart("appointment") AppointmentRequest request,
                                                                  @RequestPart("image") MultipartFile image,
                                                                  Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        var appointment = appointmentService.createAppointment(request, user, image);
        AppointmentResponse response = appointmentMapper.toResponse(appointment);
        return ResponseEntity.status(201).body(response);
    }

    @GetMapping
    public ResponseEntity<List<AppointmentResponse>> listAppointments(Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        List<AppointmentResponse> responses = appointmentMapper.toResponseList(appointmentService.listAppointments(user));
        return ResponseEntity.ok(responses);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelAppointment(@PathVariable Long id, Authentication authentication) {
        User user = userService.findByEmail(authentication.getName());
        appointmentService.cancelAppointment(id, user);
        return ResponseEntity.noContent().build();
    }
}

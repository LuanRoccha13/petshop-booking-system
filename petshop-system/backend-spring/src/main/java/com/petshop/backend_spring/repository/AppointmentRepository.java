package com.petshop.backend_spring.repository;

import com.petshop.backend_spring.domain.Appointment;
import com.petshop.backend_spring.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByUser(User user);
    Optional<Appointment> findByIdAndUser(Long id, User user);
}

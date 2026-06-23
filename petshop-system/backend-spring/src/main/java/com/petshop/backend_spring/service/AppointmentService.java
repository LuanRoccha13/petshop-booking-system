package com.petshop.backend_spring.service;

import com.petshop.backend_spring.domain.Appointment;
import com.petshop.backend_spring.domain.User;
import com.petshop.backend_spring.dto.AppointmentRequest;
import com.petshop.backend_spring.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public Appointment createAppointment(AppointmentRequest request, User user) {
        Appointment appointment = new Appointment();
        appointment.setPetName(request.getPetName());
        appointment.setBreed(request.getBreed());
        appointment.setDate(request.getDate());
        appointment.setTime(request.getTime());
        appointment.setNotes(request.getNotes());
        appointment.setImageUrl(request.getImageUrl());
        appointment.setUser(user);
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> listAppointments(User user) {
        return appointmentRepository.findByUser(user);
    }

    public void cancelAppointment(Long appointmentId, User user) {
        Appointment appointment = appointmentRepository.findByIdAndUser(appointmentId, user)
                .orElseThrow(() -> new IllegalArgumentException("Agendamento não encontrado"));
        appointmentRepository.delete(appointment);
    }
}

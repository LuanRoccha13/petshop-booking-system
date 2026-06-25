package com.petshop.backend_spring.service;

import com.petshop.backend_spring.domain.Appointment;
import com.petshop.backend_spring.domain.User;
import com.petshop.backend_spring.dto.AppointmentRequest;
import com.petshop.backend_spring.repository.AppointmentRepository;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final ImageStorageService imageStorageService;

    public AppointmentService(AppointmentRepository appointmentRepository, ImageStorageService imageStorageService) {
        this.appointmentRepository = appointmentRepository;
        this.imageStorageService = imageStorageService;
    }

    public Appointment createAppointment(AppointmentRequest request, User user, MultipartFile image) {
        if (image == null || image.isEmpty()) {
            throw new IllegalArgumentException("A imagem do pet é obrigatória");
        }

        String imageUrl = imageStorageService.store(image);

        Appointment appointment = new Appointment();
        appointment.setPetName(request.getPetName());
        appointment.setBreed(request.getBreed());
        appointment.setDate(request.getDate());
        appointment.setTime(request.getTime());
        appointment.setNotes(request.getNotes());
        appointment.setImageUrl(imageUrl);
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

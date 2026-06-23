package com.petshop.backend_spring.mapper;

import com.petshop.backend_spring.domain.Appointment;
import com.petshop.backend_spring.dto.AppointmentResponse;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AppointmentMapper {

    public AppointmentResponse toResponse(Appointment appointment) {
        AppointmentResponse response = new AppointmentResponse();
        response.setId(appointment.getId());
        response.setPetName(appointment.getPetName());
        response.setBreed(appointment.getBreed());
        response.setDate(appointment.getDate());
        response.setTime(appointment.getTime());
        response.setNotes(appointment.getNotes());
        response.setImageUrl(appointment.getImageUrl());
        return response;
    }

    public List<AppointmentResponse> toResponseList(List<Appointment> appointments) {
        return appointments.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
}

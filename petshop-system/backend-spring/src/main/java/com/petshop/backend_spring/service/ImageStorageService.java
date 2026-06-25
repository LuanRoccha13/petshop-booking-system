package com.petshop.backend_spring.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImageStorageService {

    private final Path uploadDir;

    public ImageStorageService(@Value("${app.upload-dir:uploads}") String uploadDir) {
        this.uploadDir = Paths.get(uploadDir).toAbsolutePath().normalize();
    }

    public String store(MultipartFile file) {
        try {
            Files.createDirectories(uploadDir);

            String originalFilename = file.getOriginalFilename() == null ? "image" : file.getOriginalFilename();
            String extension = getExtension(originalFilename);
            String storedFilename = UUID.randomUUID() + extension;
            Path target = uploadDir.resolve(storedFilename);

            file.transferTo(target);
            return "/uploads/" + storedFilename;
        } catch (IOException ex) {
            throw new IllegalArgumentException("Não foi possível salvar a imagem");
        }
    }

    private String getExtension(String filename) {
        int dotIndex = filename.lastIndexOf('.');
        if (dotIndex < 0) {
            return "";
        }
        return filename.substring(dotIndex).toLowerCase();
    }
}
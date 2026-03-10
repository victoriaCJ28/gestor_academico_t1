package com.academic.management.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.academic.management.Dto.ResponseDTO;
import com.academic.management.Service.AcademicService;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/api/v1")
public class AcademicController {
    private final AcademicService academicService;

    public AcademicController(AcademicService academicService) {
        this.academicService = academicService;
    }

    @GetMapping("/test")
    public ResponseDTO testEndpoint() {
        ResponseDTO response = new ResponseDTO();
        response.setMessage(academicService.getWelcomeMessage());
        response.setStatus("ACTIVE");
        return response;
    }
    


}

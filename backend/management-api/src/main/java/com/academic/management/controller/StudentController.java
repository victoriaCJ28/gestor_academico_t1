package com.academic.management.controller;

import com.academic.management.Dto.StudentDTO;
import com.academic.management.Service.StudentService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@Tag(name = "Estudiantes", description = "Operaciones para la gestion de estidiantes")
@RestController
@RequestMapping("/api/v1/students")
//@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService){
        this.studentService = studentService;
    }

    @Operation(summary = "Listar todos los estudiantes", description = "Obtiene una lista con todos los estudiantes")
    @GetMapping
    public ResponseEntity<List<StudentDTO>> getAll(){
        return ResponseEntity.ok(studentService.findAll());
    }
    @Operation(summary = "Crear estudiante", description = "Ingreso de un nuevo estudiante")
    @PostMapping
    public ResponseEntity<StudentDTO> create(@RequestBody StudentDTO student){
        StudentDTO saved = studentService.save(student);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentDTO> update(@PathVariable Long id, @RequestBody StudentDTO student){
        StudentDTO updated = studentService.update(id, student);
        if (updated != null){
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete (@PathVariable Long id){
        if (studentService.delete(id)){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    
    
    
    



}

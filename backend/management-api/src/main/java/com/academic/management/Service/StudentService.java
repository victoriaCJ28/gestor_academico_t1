package com.academic.management.Service;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.academic.management.Dto.StudentDTO;
import com.academic.management.Repository.StudentRepository;
import com.academic.management.model.Student;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }
   
    //Read 
    public List<StudentDTO> findAll(){
        return studentRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    //Created
    public StudentDTO save(StudentDTO dto){
        Student student = new Student();
        student.setFullName(dto.getFullName());
        student.setGrade(dto.getGrade());

        Student savedStudent = studentRepository.save(student);
        dto.setId(savedStudent.getId());
        return dto;

        
    }
    //Update
    public StudentDTO update(Long id, StudentDTO dto){
        return studentRepository.findById(id).map(existingStudent -> {
            existingStudent.setFullName((dto.getFullName()));
            existingStudent.setGrade(dto.getGrade());

            Student updated = studentRepository.save(existingStudent);
            dto.setId((updated.getId()));
            return dto;

        }).orElse(null);
       
    }
    //Delete
    public boolean delete(Long id){
        if (id != null && studentRepository.existsById(id)){
            studentRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Metodo aux de mapeo 

    private StudentDTO convertToDTO(Student student){
        StudentDTO dto = new StudentDTO();
        dto.setId(student.getId());
        dto.setFullName(student.getFullName());
        dto.setGrade(student.getGrade());
        return dto;
    }




    
}


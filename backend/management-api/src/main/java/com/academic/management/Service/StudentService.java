package com.academic.management.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.academic.management.Dto.StudentDTO;

@Service
public class StudentService {

    private List<StudentDTO> students = new ArrayList<>();
    //Read
    public List<StudentDTO> findAll(){
        return students;
    }
    //Created
    public StudentDTO save(StudentDTO student){
        student.setId((long)(students.size() + 1));
        students.add(student);
        return student;
    }
    //Update
    public StudentDTO update(Long id, StudentDTO updateData){
        for (StudentDTO s: students){
            if (s.getId().equals(id)){
                s.setFullName(updateData.getFullName());
                s.setGrade(updateData.getGrade());
                return s;
            }
        }
        return null;
    }
    //Delete
    public boolean delete(Long id){
        return students.removeIf(s -> s.getId().equals(id));
    }




    
}


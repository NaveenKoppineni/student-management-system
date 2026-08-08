package com.naveen.studentbackend.service;

import com.naveen.studentbackend.dto.StudentDTO;
import com.naveen.studentbackend.entity.Student;
import com.naveen.studentbackend.repository.StudentRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // CREATE
    public StudentDTO saveStudent(StudentDTO dto) {

        Student student = convertToEntity(dto);

        Student savedStudent = studentRepository.save(student);

        return convertToDTO(savedStudent);
    }

    // GET ALL
    public List<StudentDTO> getAllStudents() {

        return studentRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // GET BY ID
    public Optional<StudentDTO> getStudentById(Long id) {

        return studentRepository.findById(id)
                .map(this::convertToDTO);
    }

    // UPDATE
    public StudentDTO updateStudent(Long id, StudentDTO dto) {

        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        existingStudent.setName(dto.getName());
        existingStudent.setEmail(dto.getEmail());
        existingStudent.setCourse(dto.getCourse());

        Student updatedStudent = studentRepository.save(existingStudent);

        return convertToDTO(updatedStudent);
    }

    // DELETE
    public void deleteStudent(Long id) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        studentRepository.delete(student);
    }

    // SEARCH BY EMAIL
    public Optional<StudentDTO> getStudentByEmail(String email) {

        return studentRepository.findByEmail(email)
                .map(this::convertToDTO);
    }

    // SEARCH BY NAME
    public List<StudentDTO> getStudentByName(String name) {

        return studentRepository.findByName(name)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // SEARCH BY COURSE
    public List<StudentDTO> getStudentsByCourse(String course) {

        return studentRepository.findByCourseOrderByNameAsc(course)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // PARTIAL SEARCH
    public List<StudentDTO> searchStudentsByName(String keyword) {

        return studentRepository.findByNameContaining(keyword)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // PAGINATION + SORTING
    public Page<StudentDTO> getStudentsByPage(int page,
                                              int size,
                                              String sortBy,
                                              String direction) {

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Student> studentPage = studentRepository.findAll(pageable);

        return studentPage.map(this::convertToDTO);
    }

    // ENTITY -> DTO
    private StudentDTO convertToDTO(Student student) {

        StudentDTO dto = new StudentDTO();

        dto.setId(student.getId());
        dto.setName(student.getName());
        dto.setEmail(student.getEmail());
        dto.setCourse(student.getCourse());

        return dto;
    }

    // DTO -> ENTITY
    private Student convertToEntity(StudentDTO dto) {

        Student student = new Student();

        student.setId(dto.getId());
        student.setName(dto.getName());
        student.setEmail(dto.getEmail());
        student.setCourse(dto.getCourse());

        return student;
    }
}
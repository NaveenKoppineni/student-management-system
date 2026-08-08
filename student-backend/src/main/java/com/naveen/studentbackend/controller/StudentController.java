package com.naveen.studentbackend.controller;

import com.naveen.studentbackend.dto.StudentDTO;
import com.naveen.studentbackend.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // CREATE
    @PostMapping
    public StudentDTO addStudent(@Valid @RequestBody StudentDTO dto) {
        return studentService.saveStudent(dto);
    }

    // GET ALL
    @GetMapping
    public List<StudentDTO> getAllStudents() {
        return studentService.getAllStudents();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Optional<StudentDTO> getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public StudentDTO updateStudent(@PathVariable Long id,
                                    @Valid @RequestBody StudentDTO dto) {

        return studentService.updateStudent(id, dto);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {

        studentService.deleteStudent(id);
        return "Student deleted successfully";
    }

    // SEARCH BY EMAIL
    @GetMapping("/email/{email}")
    public StudentDTO getStudentByEmail(@PathVariable String email) {

        return studentService.getStudentByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    // SEARCH BY NAME
    @GetMapping("/name/{name}")
    public List<StudentDTO> getStudentByName(@PathVariable String name) {
        return studentService.getStudentByName(name);
    }

    // SEARCH BY COURSE
    @GetMapping("/course/{course}")
    public List<StudentDTO> getStudentsByCourse(@PathVariable String course) {
        return studentService.getStudentsByCourse(course);
    }

    // PARTIAL SEARCH
    @GetMapping("/search/{keyword}")
    public List<StudentDTO> searchStudentsByName(@PathVariable String keyword) {
        return studentService.searchStudentsByName(keyword);
    }

    // PAGINATION + SORTING
    @GetMapping("/page")
    public Page<StudentDTO> getStudentsByPage(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam String sortBy,
            @RequestParam String direction) {

        return studentService.getStudentsByPage(page, size, sortBy, direction);
    }
}
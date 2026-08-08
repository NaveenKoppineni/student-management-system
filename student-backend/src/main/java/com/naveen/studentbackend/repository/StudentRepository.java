package com.naveen.studentbackend.repository;

import com.naveen.studentbackend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByEmail(String email);
    List<Student> findByName(String name);
    List<Student> findByCourseOrderByNameAsc(String course);
    List<Student> findByNameContaining(String keyword);

}

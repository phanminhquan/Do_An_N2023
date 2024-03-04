package com.spring.iot.services;

import com.spring.iot.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserService extends JpaRepository<User,Long> {
    User findUserByEmail(String email);
    User findUserById(Long id);
}

package com.spring.iot.services.auth;


import com.spring.iot.dto.SignupDTO;
import com.spring.iot.dto.UserDTO;
import com.spring.iot.entities.User;

public interface AuthService {
    UserDTO createUser(SignupDTO signupDTO);
}

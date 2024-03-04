package com.spring.iot.controllers;

import com.spring.iot.dto.SignupDTO;
import com.spring.iot.dto.UserDTO;
import com.spring.iot.entities.User;
import com.spring.iot.services.UserService;
import com.spring.iot.services.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthService authService;

    @GetMapping("/api/user/get0-all")
    public ResponseEntity<List<User>> getAllUser(){
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }

    @DeleteMapping("/api/user/delete")
    public  ResponseEntity<String> deleteUser(@RequestParam("idUSer") Long idUser, Principal user){
        try {
            User u = userService.findUserById(idUser);
            User checkUser = userService.findUserByEmail(user.getName());
            if(checkUser.getId().equals(u.getId()))
                return new ResponseEntity<>("Bạn không thể xóa tài khoản của chính bạn", HttpStatus.OK);
            userService.delete(u);

            return new ResponseEntity<>("Success",HttpStatus.OK );
        }
        catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/api/user/create-user")
    public ResponseEntity<?> createUser(@RequestBody SignupDTO signupDTO){
        UserDTO createdUser = authService.createUser(signupDTO);
        if (createdUser == null){
            return new ResponseEntity<>("User not created, come again later!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }
}

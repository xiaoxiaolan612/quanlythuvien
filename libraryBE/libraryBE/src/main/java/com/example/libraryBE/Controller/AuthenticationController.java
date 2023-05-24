package com.example.libraryBE.Controller;


import com.example.libraryBE.Repository.CustomUserRepository;
import com.example.libraryBE.Config.JwtUtils;
import com.example.libraryBE.Model.CustomUser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;


@CrossOrigin
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

	@Autowired
    private AuthenticationManager authenticationManager;
	@Autowired
    private CustomUserRepository customUserRepository;
	@Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<String> login(
            @RequestBody Map<String, Object> req
    ) {
        System.out.println("pass");
        String username = (String) req.get("username");
        String password = (String) req.get("password");
        System.out.println(username + " " + password);
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );
        System.out.println("pass");
        final CustomUser user = customUserRepository.findUserByUsername(username);
        if (user != null) {
            System.out.println("pass");
            return ResponseEntity.ok(jwtUtils.generateToken(user));
        }
        return ResponseEntity.status(400).body("error");
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody Map<String, Object> req
    ) {
        if (customUserRepository.findUserByUsername((String) req.get("username")) == null) {
            CustomUser customUser = new CustomUser();
            customUser.setUsername((String)req.get("username"));
            customUser.setPassword((String)req.get("password"));
            customUser.setFirstName((String) req.get("firstname"));
            customUser.setLastName((String) req.get("lastname"));
            customUser.setRoles((String)req.get("role"));
            customUserRepository.save(customUser);
            return ResponseEntity.status(200).body("success");
        }
        return ResponseEntity.status(400).body("error");
    }

    @PostMapping("/{id}")
    public CustomUser customUser (
            @PathVariable String id,
            HttpServletResponse resp,
            HttpServletRequest req
    ){
        final String authHeader =  req.getHeader(AUTHORIZATION);
        String jwtToken = authHeader.substring(7);
        String username = jwtUtils.extractUsername(jwtToken);
        CustomUser customUser = customUserRepository.findUserByUsername(username);
        if(customUser.getRoles().equals("ADMIN")){
            CustomUser customUser1 = new CustomUser();
            if(customUserRepository.existsById(Integer.parseInt((id)))){
                customUser1 = customUserRepository.getReferenceById(Integer.parseInt(id));
            }
            return customUser1;
        }
        return null;
    }

    @PostMapping("/info")
    public CustomUser Info(
            HttpServletResponse resp,
            HttpServletRequest req
    ) {
        final String authHeader =  req.getHeader(AUTHORIZATION);
        String jwtToken = authHeader.substring(7);
        String username = jwtUtils.extractUsername(jwtToken);
        CustomUser customUser = customUserRepository.findUserByUsername(username);
        if(customUser != null){
            return customUser;
        }
        return null;
    }
    @PostMapping("/list")
    public List<CustomUser> listUser(
            HttpServletResponse resp,
            HttpServletRequest req
    ) {
        final String authHeader =  req.getHeader(AUTHORIZATION);
        String jwtToken = authHeader.substring(7);
        String username = jwtUtils.extractUsername(jwtToken);
        CustomUser customUser = customUserRepository.findUserByUsername(username);
        if (customUser.getRoles().equals("ADMIN")){
            return  customUserRepository.findAll();
        }
        return null;
    }
    @PutMapping("/{id}")
    public ResponseEntity<String> saveCustomUser(
            @PathVariable String id,
            @RequestBody Map<String, Object> body,
            HttpServletResponse resp,
            HttpServletRequest req
    ) throws JsonProcessingException {
        final String authHeader =  req.getHeader(AUTHORIZATION);
        String jwtToken = authHeader.substring(7);
        String username = jwtUtils.extractUsername(jwtToken);
        CustomUser customUserReq = customUserRepository.findUserByUsername(username);
        System.out.println(customUserReq.toString());
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> obj = (Map<String, Object>) body.get("user");
        obj.remove("hibernateLazyInitializer");
        String json = objectMapper.writeValueAsString(obj);
        CustomUser customUser = objectMapper.readValue(json, CustomUser.class);
        System.out.println(customUser);
        if (customUserReq.getRoles().equals("ADMIN") || customUserReq.getUsername().equals(customUser.getUsername())){
            CustomUser customUser1 = customUserRepository.findUserByUsername(customUser.getUsername());

            if(customUser1 == null || (customUser1 != null && customUser.getUserId() == customUser1.getUserId())) {
                customUserRepository.save(customUser);
                return ResponseEntity.status(200).body(null);
            }
            else{
                return ResponseEntity.status(400).body("Username đã tồn tại");
            }
        }
        return ResponseEntity.status(400).body(null);
    }
    @DeleteMapping("/{id}")
    public  ResponseEntity<String> deleteUser(
            @PathVariable String id,
            HttpServletResponse resp,
            HttpServletRequest req
    ){
        final String authHeader =  req.getHeader(AUTHORIZATION);
        String jwtToken = authHeader.substring(7);
        String username = jwtUtils.extractUsername(jwtToken);
        CustomUser customUser = customUserRepository.findUserByUsername(username);
        if (customUser.getRoles().equals("ADMIN")){
            customUserRepository.deleteById(Integer.parseInt(id));
            return ResponseEntity.status(200).body(null);
        }
        return ResponseEntity.status(400).body(null);
    }
}

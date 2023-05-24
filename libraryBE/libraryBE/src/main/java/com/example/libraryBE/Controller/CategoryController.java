package com.example.libraryBE.Controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.example.libraryBE.Config.JwtUtils;
import com.example.libraryBE.Model.CustomUser;
import com.example.libraryBE.Repository.CustomUserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.libraryBE.Repository.CategoryRepository;
import com.example.libraryBE.Model.Category;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@CrossOrigin
@RequestMapping("api/category")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private CustomUserRepository customUserRepository;

    @GetMapping("/list")
    public List<Category> Categories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/{id}")
    public Category editCategory(@PathVariable String id) {
        System.out.println((id));
        Category category = new Category();
        if (categoryRepository.existsById(Integer.parseInt(id))) {
            category = categoryRepository.getReferenceById(Integer.parseInt(id));
        }

        return category;
    }//

    @PutMapping("/{id}")
    public ResponseEntity<String> update(
            @PathVariable String id,
            @RequestBody Map<String, Object> body,
            HttpServletResponse resp,
            HttpServletRequest req
    ) throws JsonProcessingException {
        final String authHeader =  req.getHeader(AUTHORIZATION);
        String jwtToken = authHeader.substring(7);
        String username = jwtUtils.extractUsername(jwtToken);
        CustomUser customUser = customUserRepository.findUserByUsername(username);
        if(customUser.getRoles().equals("ADMIN")){
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> map = (Map<String, Object>) body.get("category");
            map.remove("hibernateLazyInitializer");
            String json = objectMapper.writeValueAsString(map);
            Category category = objectMapper.readValue(json, Category.class);
            if (categoryRepository.findByNameAndId(category.getCategoryName(), category.getCategoryID()) == null){
                categoryRepository.save(category);
                return ResponseEntity.status(200).body(null);
            }
            return ResponseEntity.status(400).body("Name Already Exists!!!");
        }
        return ResponseEntity.status(400).body(null);
    }

    @PostMapping("/{id}")
    public ResponseEntity<String> save(
            @PathVariable String id,
            @RequestBody Map<String, Object> body,
            HttpServletResponse resp,
            HttpServletRequest req
    ) throws JsonProcessingException {
        final String authHeader =  req.getHeader(AUTHORIZATION);
        String jwtToken = authHeader.substring(7);
        String username = jwtUtils.extractUsername(jwtToken);
        CustomUser customUser = customUserRepository.findUserByUsername(username);
        if(customUser.getRoles().equals("ADMIN")){
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> map = (Map<String, Object>) body.get("category");
            map.remove("hibernateLazyInitializer");
            String json = objectMapper.writeValueAsString(map);
            Category category = objectMapper.readValue(json, Category.class);
            if (categoryRepository.findByNameAndId(category.getCategoryName(), category.getCategoryID()) == null){
                categoryRepository.save(category);
                return ResponseEntity.status(200).body(null);
            }
            return ResponseEntity.status(400).body("Name Already Exists!!!");
        }
        return ResponseEntity.status(400).body(null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Category> delete(
            @PathVariable String id,
            HttpServletResponse resp,
            HttpServletRequest req
    ) throws IOException {
        final String authHeader =  req.getHeader(AUTHORIZATION);
        String jwtToken = authHeader.substring(7);
        String username = jwtUtils.extractUsername(jwtToken);
        CustomUser customUser = customUserRepository.findUserByUsername(username);
        if(customUser.getRoles().equals("ADMIN")){
            categoryRepository.deleteById(Integer.parseInt(id));
            return ResponseEntity.status(200).body(null);
        }
        return ResponseEntity.status(400).body(null);
    }
}

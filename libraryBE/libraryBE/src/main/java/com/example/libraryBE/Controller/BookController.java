package com.example.libraryBE.Controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

import com.example.libraryBE.Config.JwtUtils;
import com.example.libraryBE.Model.CustomUser;
import com.example.libraryBE.Repository.CustomUserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.libraryBE.Repository.BookRepository;
import com.example.libraryBE.Repository.CategoryRepository;
import com.example.libraryBE.Model.Book;
import com.example.libraryBE.Model.Category;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@CrossOrigin
@RestController
@RequestMapping("/api/book")
@RequiredArgsConstructor
public class BookController {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private CustomUserRepository customUserRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/list")
    public List<Book> Books() throws IOException {
        return bookRepository.findAll();
    }

    @GetMapping("/{id}")
    public Book getBook(@PathVariable String id) {
        System.out.println("passssssssssss");
        Book book = new Book();
        if (bookRepository.existsById(Integer.parseInt(id))) {
            book = bookRepository.getReferenceById(Integer.parseInt(id));
        }
        return book;
    }

    @GetMapping("/category")
    public List<Book> getBooksOfCategory(@PathVariable String id, Map<String, Object> req) {
        Category category = (Category) req.get("Category");
        List<Book> books = bookRepository.findByCategory(category);
        return books;
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
        System.out.println(username);
        if(customUser.getRoles().equals("ADMIN")){
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> obj = (Map<String, Object>)  body.get("book");
            obj.remove("hibernateLazyInitializer");
            String json = objectMapper.writeValueAsString(obj);
            Book book = objectMapper.readValue(json, Book.class);
            Category category = categoryRepository.getReferenceById(book.getCategory().getCategoryID());
            category.setSumBook(category.getSumBook() + 1);
            categoryRepository.save(category);
            bookRepository.save(book);
            return ResponseEntity.status(200).body(null);
        }
        return ResponseEntity.status(400).body(null);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> update(
            @PathVariable String id,
            @RequestBody Map<String, Object> body,
            HttpServletResponse resp,
            HttpServletRequest req
    ) throws JsonProcessingException {
        final String authHeader =  req.getHeader(AUTHORIZATION);
        String jwtToken = authHeader.substring(7);
        String username = jwtUtils.extractUsername(jwtToken);
        CustomUser customUser = customUserRepository.findUserByUsername(username);
        System.out.println(username);
        if(customUser.getRoles().equals("ADMIN")){
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> obj = (Map<String, Object>)  body.get("book");
            obj.remove("hibernateLazyInitializer");
            String json = objectMapper.writeValueAsString(obj);
            Book book = objectMapper.readValue(json, Book.class);
            Book oldBook = bookRepository.getReferenceById(Integer.parseInt(book.getBookID().toString()));
            if(oldBook.getCategory().getCategoryID() != book.getCategory().getCategoryID()){
                Category category1 = categoryRepository.getReferenceById(oldBook.getCategory().getCategoryID());
                Category category2 = categoryRepository.getReferenceById(book.getCategory().getCategoryID());
                category1.setSumBook(category1.getSumBook() - 1);
                category2.setSumBook(category2.getSumBook() + 1);
                categoryRepository.save(category1);
                categoryRepository.save(category2);
            }
            bookRepository.save(book);
            return ResponseEntity.status(200).body(null);
        }
        return ResponseEntity.status(400).body(null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> DeleteBook(
            @PathVariable String id,
            HttpServletResponse resp,
            HttpServletRequest req
    ) {
        final String authHeader =  req.getHeader(AUTHORIZATION);
        String jwtToken = authHeader.substring(7);
        String username = jwtUtils.extractUsername(jwtToken);
        CustomUser customUser = customUserRepository.findUserByUsername(username);
        if(customUser.getRoles().equals("ADMIN")){
            bookRepository.deleteById(Integer.parseInt(id));
            return ResponseEntity.status(200).body(null);
        }
        return ResponseEntity.status(400).body(null);
    }
}

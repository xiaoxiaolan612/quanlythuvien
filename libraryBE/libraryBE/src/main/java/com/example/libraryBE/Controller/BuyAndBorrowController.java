package com.example.libraryBE.Controller;


import com.example.libraryBE.Model.Book;
import com.example.libraryBE.Model.CustomUser;
import com.example.libraryBE.Repository.BookRepository;
import com.example.libraryBE.Repository.BuyAndBorrowRepository;
import com.example.libraryBE.Repository.CustomUserRepository;
import com.example.libraryBE.Config.JwtUtils;
import com.example.libraryBE.Model.BuyAndBorrow;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@CrossOrigin
@RequestMapping("api/BuyAndBorrow")
public class BuyAndBorrowController {
    @Autowired
    private CustomUserRepository customUserRepository;
    @Autowired
    private BuyAndBorrowRepository buyAndBorrowRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private JwtUtils jwtUtils;
    @GetMapping("/admin/listBuy")
    public  List<BuyAndBorrow> ListBuy (
            HttpServletResponse resp,
            HttpServletRequest req
    ){
        System.out.println("1000");
        final String authHeader =  req.getHeader(AUTHORIZATION);
        String jwtToken = authHeader.substring(7);
        String username = jwtUtils.extractUsername(jwtToken);
        CustomUser customUser = customUserRepository.findUserByUsername(username);
        if (customUser.getRoles().equals("ADMIN")){
            List<BuyAndBorrow> buyAndBorrowList = buyAndBorrowRepository.findByBuyGreaterThanAndOptions(0, "buy");
            System.out.println(buyAndBorrowList.size());
            buyAndBorrowList.sort(Comparator.comparing(BuyAndBorrow::getBuy));
            return buyAndBorrowList;
        }
        return null;
    }
    @GetMapping("/admin/listBorrow")
    public  List<BuyAndBorrow> buyAndBorrowListSent (
            HttpServletResponse resp,
            HttpServletRequest req
    ){
        final String authHeader =  req.getHeader(AUTHORIZATION);
        String jwtToken = authHeader.substring(7);
        String username = jwtUtils.extractUsername(jwtToken);
        CustomUser customUser = customUserRepository.findUserByUsername(username);
        if (customUser.getRoles().equals("ADMIN")){
            List<BuyAndBorrow> buyAndBorrowList= buyAndBorrowRepository.findByBuyGreaterThanAndOptions(0, "borrow");
            System.out.println(buyAndBorrowList.size());
            buyAndBorrowList.sort(Comparator.comparing(BuyAndBorrow::getBuy));
            return buyAndBorrowList;
        }
        return null;
    }
    @GetMapping("/listOfUser")
    public List<BuyAndBorrow> ListOfUser (
            HttpServletResponse resp,
            HttpServletRequest req
    ){
        final String authHeader =  req.getHeader(AUTHORIZATION);
        String jwtToken = authHeader.substring(7);
        String username = jwtUtils.extractUsername(jwtToken);
        CustomUser customUser = customUserRepository.findUserByUsername(username);
        System.out.println(customUser.toString());
        if (customUser.getRoles().length() > 0){
            List<BuyAndBorrow> buyAndBorrowList= buyAndBorrowRepository.findByUser(customUser);
            buyAndBorrowList.sort(Comparator.comparing(BuyAndBorrow::getBuy));
            return buyAndBorrowList;
        }
        return null;
    }
    @GetMapping("/{id}")
    public BuyAndBorrow buyAndBorrow(
            @PathVariable String id,
            HttpServletResponse resp,
            HttpServletRequest req
    ){
        final String authHeader =  req.getHeader(AUTHORIZATION);
        String jwtToken = authHeader.substring(7);
        String username = jwtUtils.extractUsername(jwtToken);
        System.out.println("pass7654321");
        if(Integer.parseInt(id) == -1){
            BuyAndBorrow buyAndBorrow = new BuyAndBorrow();
            buyAndBorrow.setOptions("buy");
            return  buyAndBorrow;
        }
        CustomUser customUser = customUserRepository.findUserByUsername(username);
        BuyAndBorrow buyAndBorrow = buyAndBorrowRepository.getReferenceById(Integer.parseInt(id));
        CustomUser customUserOrder = buyAndBorrow.getUser();

        if(customUserOrder.getUsername().equals(username) || customUser.getRoles().equals("ADMIN")){
            return buyAndBorrow;
        }
        return null;
    }


    @PostMapping("/{id}")
    public ResponseEntity<String> save (
            @PathVariable String id,
            @RequestBody Map<String, Object> body,
            HttpServletResponse resp,
            HttpServletRequest req
    ) throws JsonProcessingException {
        final String authHeader =  req.getHeader(AUTHORIZATION);
        String jwtToken = authHeader.substring(7);
        String username = jwtUtils.extractUsername(jwtToken);
        CustomUser customUser = customUserRepository.findUserByUsername(username);
        System.out.println(customUser.toString());
        if(customUser.getRoles().length() > 0){
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> obj = (Map<String, Object>) body.get("order");
            Map<String, Object> objBook  = (Map<String, Object>) obj.get("book");
            System.out.println(objBook.toString());
            objBook.remove("hibernateLazyInitializer");
            obj.remove("hibernateLazyInitializer");
            obj.put("book", objBook);

            String json = objectMapper.writeValueAsString(obj);
            System.out.println(json);
            BuyAndBorrow buyAndBorrow = objectMapper.readValue(json, BuyAndBorrow.class);
            List<BuyAndBorrow> inSql = buyAndBorrowRepository.findByUserAndBookAndBuyLessThanAndOptions(buyAndBorrow.getUser(), buyAndBorrow.getBook(), 2, buyAndBorrow.getOptions());
            for (BuyAndBorrow x : inSql){
                System.out.println(x.toString());
            }
            System.out.println(inSql.toString());
            Book book = buyAndBorrow.getBook();
            if(buyAndBorrow.getOptions().equals("buy") && book.getBuy() == 0){
                return ResponseEntity.status(400).body("Sản phẩm này hiện đã hết hàng.");
            }
            if(buyAndBorrow.getOptions().equals("borrow") && book.getBorrow() == 0){
                return ResponseEntity.status(400).body("Sản phẩm này hiện đã hết hàng.");
            }
            if(inSql.size() > 0){
                return ResponseEntity.status(400).body("Sản phẩm này đã có trong giỏ hàng của bạn rồi.");
            }
            buyAndBorrowRepository.save(buyAndBorrow);
            return ResponseEntity.status(200).body(null);
        }
        return ResponseEntity.status(400).body(null);
    }
    @PutMapping("/{id}")
    public ResponseEntity<String> update (
            @PathVariable String id,
            @RequestBody Map<String, Object> body,
            HttpServletResponse resp,
            HttpServletRequest req
    ) throws JsonProcessingException {
        final String authHeader =  req.getHeader(AUTHORIZATION);
        String jwtToken = authHeader.substring(7);
        String username = jwtUtils.extractUsername(jwtToken);
        CustomUser customUser = customUserRepository.findUserByUsername(username);
        System.out.println(customUser.toString());
        if(customUser.getRoles().length() > 0){
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> obj = (Map<String, Object>) body.get("order");
            obj.remove("hibernateLazyInitializer");
            String json = objectMapper.writeValueAsString(obj);
            BuyAndBorrow buyAndBorrow = objectMapper.readValue(json, BuyAndBorrow.class);
            if(buyAndBorrow.getReceiveDate() != null){
                if(buyAndBorrow.getReceiveDate().isAfter(buyAndBorrow.getReturnDate())){
                    return ResponseEntity.status(400).body("Ngày mượn phải trước ngày trả");
                }
            }
            buyAndBorrow.setBuy(buyAndBorrow.getBuy() + 1);
            if(buyAndBorrow.getOptions().equals("buy") && buyAndBorrow.getBuy() == 2){
                Book book = buyAndBorrow.getBook();
                book.setBuy(book.getBuy() - 1);
                bookRepository.save(book);
            }
            if(buyAndBorrow.getOptions().equals("borrow")){
                if(buyAndBorrow.getBuy() == 2){
                    Book book = buyAndBorrow.getBook();
                    book.setBorrow(book.getBorrow() - 1);
                    bookRepository.save(book);

                }
                else if(buyAndBorrow.getBuy() == 3){
                    Book book = buyAndBorrow.getBook();
                    book.setBorrow(book.getBorrow() + 1);
                    bookRepository.save(book);
                }
            }

            buyAndBorrowRepository.save(buyAndBorrow);
            return ResponseEntity.status(200).body(null);
        }
        return ResponseEntity.status(400).body(null);
    }

    @DeleteMapping("refuse/{id}")
    private ResponseEntity<String> refuse (
            @PathVariable String id,
            HttpServletResponse resp,
            HttpServletRequest req
    ){
        final String authHeader =  req.getHeader(AUTHORIZATION);
        String jwtToken = authHeader.substring(7);
        String username = jwtUtils.extractUsername(jwtToken);
        CustomUser customUser = customUserRepository.findUserByUsername(username);
        if (customUser.getRoles().length() > 0){
            BuyAndBorrow buyAndBorrow = buyAndBorrowRepository.getReferenceById(Integer.parseInt(id));
            buyAndBorrow.setBuy(0);
            buyAndBorrowRepository.save(buyAndBorrow);
            return ResponseEntity.status(200).body(null);
        }
        return ResponseEntity.status(400).body(null);

    }
//
    @DeleteMapping("/{id}")
    private ResponseEntity<String> delete (
            @PathVariable String id,
            HttpServletResponse resp,
            HttpServletRequest req
    ){
        final String authHeader =  req.getHeader(AUTHORIZATION);
        String jwtToken = authHeader.substring(7);
        String username = jwtUtils.extractUsername(jwtToken);
        CustomUser customUser = customUserRepository.findUserByUsername(username);
        if (customUser.getRoles().length() > 0){
            buyAndBorrowRepository.deleteById(Integer.parseInt(id));
            return ResponseEntity.status(200).body(null);
        }
        return ResponseEntity.status(400).body(null);

    }


}

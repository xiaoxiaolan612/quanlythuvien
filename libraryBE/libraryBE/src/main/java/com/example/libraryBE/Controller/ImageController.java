package com.example.libraryBE.Controller;

import com.example.libraryBE.Config.JwtUtils;
import com.example.libraryBE.Model.CustomUser;
import com.example.libraryBE.Repository.CustomUserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@CrossOrigin
@RequestMapping("api/image")
public class ImageController {

    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private CustomUserRepository customUserRepository;
    @PostMapping("/upload")
    public ResponseEntity<String> upload(
            @RequestParam("image") MultipartFile image,
            HttpServletResponse resp,
            HttpServletRequest req
    ){
        final String authHeader =  req.getHeader(AUTHORIZATION);
        String jwtToken = authHeader.substring(7);
        String username = jwtUtils.extractUsername(jwtToken);
        CustomUser customUser = customUserRepository.findUserByUsername(username);
        if (customUser.getRoles().equals("ADMIN")){
            try {
                String fileName = image.getOriginalFilename();
                if (!fileName.equals("")) {
                    fileName = new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date()) + "_" + fileName;
                    byte[] bytes = image.getBytes();
                    Path path = Paths.get("D:/TTCS/libraryFE/public/images/backend" + fileName);
                    FileOutputStream fos = new FileOutputStream(path.toString());
                    fos.write(bytes);
                    String url = path.toString();
                    url = url.replaceAll("D:\\\\TTCS\\\\libraryFE\\\\public\\\\", "");
                    System.out.println(resp);
                    return ResponseEntity.status(200).body(url);
                }
            } catch (Exception e) {
                e.printStackTrace();
            };
        }
        return ResponseEntity.status(400).body(null);
    }
}

package org.example.blogsakura_java;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@ServletComponentScan
@SpringBootApplication
public class BlogsakuraJavaApplication {

    public static void main(String[] args) {
        SpringApplication.run(BlogsakuraJavaApplication.class, args);
    }

}

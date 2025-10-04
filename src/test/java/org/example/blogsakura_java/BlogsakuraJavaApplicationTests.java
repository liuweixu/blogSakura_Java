package org.example.blogsakura_java;
import org.example.blogsakura_java.mapper.UserMapper;
import org.example.blogsakura_java.pojo.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@SpringBootTest
class BlogsakuraJavaApplicationTests {

    @Autowired
    UserMapper userMapper;

    @Test
    void contextLoads() {
        User user = new User();
        user.setMobile("18612345677");
        user.setCode("246810");
        System.out.println(userMapper.getUserByMobile(user));
    }

}

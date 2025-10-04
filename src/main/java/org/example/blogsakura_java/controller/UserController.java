package org.example.blogsakura_java.controller;

import lombok.extern.slf4j.Slf4j;
import org.example.blogsakura_java.mapper.UserMapper;
import org.example.blogsakura_java.pojo.Result;
import org.example.blogsakura_java.pojo.User;
import org.example.blogsakura_java.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/backend/login")
    public Result login(@RequestBody User user){
        log.info("获取登录信息:{}", user);
        User user_result = userService.getUserByMobile(user);
        return user_result != null ? Result.success() : Result.error("用户名或密码错误");
    }
}

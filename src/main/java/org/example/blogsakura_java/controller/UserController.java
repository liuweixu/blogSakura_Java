package org.example.blogsakura_java.controller;

import lombok.extern.slf4j.Slf4j;
import org.example.blogsakura_java.pojo.Result;
import org.example.blogsakura_java.pojo.User;
import org.example.blogsakura_java.service.UserService;
import org.example.blogsakura_java.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/backend/login")
    public Result login(@RequestBody User user){
        log.info("获取登录信息:{}", user);
        User user_result = userService.getUserByMobile(user);
        if (user_result != null){
            Map<String, Object> claims = new HashMap<>();
            claims.put("mobile", user.getMobile());
            claims.put("code", user.getCode());

            String token = JwtUtils.createToken(claims);
            return Result.success(token);
        }
        return Result.error("用户名或密码错误");
    }

}

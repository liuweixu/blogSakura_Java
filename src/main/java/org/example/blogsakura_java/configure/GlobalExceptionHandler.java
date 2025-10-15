package org.example.blogsakura_java.configure;

import cn.dev33.satoken.exception.NotLoginException;
import org.example.blogsakura_java.aop.Log;
import org.example.blogsakura_java.pojo.Result;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotLoginException.class)
    @Log
    public Result handleNotLogin(NotLoginException e) {
        return Result.error("未登录或登录状态已过期，请重新登录");
    }
}

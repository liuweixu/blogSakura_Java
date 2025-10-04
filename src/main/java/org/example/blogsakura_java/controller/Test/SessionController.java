package org.example.blogsakura_java.controller.Test;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.example.blogsakura_java.pojo.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@RestController
public class SessionController {

    // 设置cookie
    @GetMapping("/c1")
    public Result cookie1 (HttpServletResponse response){
        response.addCookie(new Cookie("login_username", "itheima"));
        return Result.success();
    }

    // 获取cookie
    @GetMapping("/c2")
    public Result cookie2 (HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("login_username")) {
                log.info("login_username:" + cookie.getValue());
            }
        }
        return Result.success();
    }

    @GetMapping("/s1")
    public Result session1 (HttpSession session){
        log.info("HttpSession-s1:{}", session.hashCode());
        session.setAttribute("login_username", "liu");
        return Result.success();
    }

    @GetMapping("/s2")
    public Result session2 (HttpServletRequest request){
        HttpSession session = request.getSession();
        log.info("HttpSession-s2:{}", session.hashCode());

        Object loginUsername = session.getAttribute("login_username");
        log.info("login_username:{}", loginUsername);
        return Result.success();
    }
}


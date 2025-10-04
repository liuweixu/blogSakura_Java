package org.example.blogsakura_java;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.example.blogsakura_java.mapper.UserMapper;
import org.example.blogsakura_java.pojo.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

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

    @Test
    void getJwtToken(){
        Calendar instance = Calendar.getInstance();
        // 默认30 s
        instance.add(Calendar.SECOND, 30);

        // 头部map
        Map<String, Object> headerMap = new HashMap<>();
        headerMap.put("typ", "jwt");
        headerMap.put("alg", "sha256");

        Map<String,Object> claims = new HashMap<>();
        claims.put("id",1);
        claims.put("username","Tom");

        String jwt =  JWT.create()
                .withHeader(headerMap)      // 头部, 默认使用 sha256 算法
                .withIssuer("liu")    // 签发者
                .withIssuedAt(Instant.now())  // 签发时间
                .withExpiresAt(instance.getTime())        // 有效时间
                .withNotBefore(Instant.now())           // 定义某个时间前都不可用
                .withJWTId("blogsakura")      // 唯一身份标识
                .withClaim("claims", claims)
                .sign(Algorithm.HMAC256("blogsakura"));
        System.out.println(jwt);
    }

    @Test
    void verifyJwtToken(){
        String token = "eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ4aWFvIHlhbmciLCJpYXQiOjE3NTk1NzYzMDQsImV4cCI6MTc1OTU3NjMzNCwic3ViIjoiZGFqaV95YW5nQDE2My5jb20iLCJhdWQiOlsid3d3LmJhaWR1LmNvbSIsInd3dy5nb29nbGUuY29tIl0sIm5iZiI6MTc1OTU3NjMwNCwianRpIjoiZGRkZGRkZGQiLCJ1c2VySWQiOjExLCJ1c2VybmFtZSI6Imd1ZXN0In0.aeBHOWw8JJ_uWSHSG12Oe6bSv478C6oTB_F0XEDiJ7c";
        DecodedJWT xiaobai = JWT.require(Algorithm.HMAC256("xiaobai")).build().verify(token);
        System.out.println(xiaobai.getClaim("userId"));
        System.out.println(xiaobai.getClaim("username"));
    }
}

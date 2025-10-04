package org.example.blogsakura_java.utils;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.time.Instant;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

public class JwtUtils {

    private static String signKey = "blogsakura";
    private static Long expire = 43200000L;
    /*
    * 生成JWT令牌
    * */
    public static String createToken(Map<String, Object> claims) {
        Calendar instance = Calendar.getInstance();
        // 默认30 s
        instance.add(Calendar.SECOND, 30 * 60);

        // 头部map
        Map<String, Object> headerMap = new HashMap<>();
        headerMap.put("typ", "jwt");
        headerMap.put("alg", "sha256");

        return JWT.create()
                .withHeader(headerMap)      // 头部, 默认使用 sha256 算法
                .withIssuer("liu")    // 签发者
                .withIssuedAt(Instant.now())  // 签发时间
                .withExpiresAt(instance.getTime())        // 有效时间
                .withNotBefore(Instant.now())           // 定义某个时间前都不可用
                .withJWTId(signKey)      // 唯一身份标识
                .withClaim("claims", claims)
                .sign(Algorithm.HMAC256(signKey));

    }
    /**
     * 解析JWT令牌
     */
    public static DecodedJWT parseJWT(String jwt){
        return JWT.require(Algorithm.HMAC256(signKey))
                .build()
                .verify(jwt);
    }
}

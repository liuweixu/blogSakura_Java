package org.example.blogsakura_java.service.impl;

import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.example.blogsakura_java.mapper.ArticleMapper;
import org.example.blogsakura_java.service.ViewService;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Collections;
import java.util.Set;
import java.util.concurrent.CompletableFuture;

@Slf4j
@Service
public class ViewServiceImpl implements ViewService {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Resource
    private ArticleMapper articleMapper;

    private final DefaultRedisScript<Long> incrementScript;

    public ViewServiceImpl() {
        incrementScript = new DefaultRedisScript<>();
        incrementScript.setResultType(Long.class);
        incrementScript.setScriptText(
                "local key = KEYS[1]\n" +
                        "local defaultValue = tonumber(ARGV[1])\n" +
                        "local expireSeconds = tonumber(ARGV[2])\n" +
                        "\n" +
                        "local value = redis.call(\"GET\", key)\n" +
                        "if not value then\n" +
                        "    redis.call(\"SET\", key, defaultValue, \"EX\", expireSeconds)\n" +
                        "else\n" +
                        "    value = redis.call(\"INCR\", key)\n" +
                        "    return value\n" +
                        "end"
        );
    }

    /**
     *
     */
    @Override
    public Long getViews(String id) {
        String result = stringRedisTemplate.opsForValue().get(id);
        if (result == null || result.isBlank() || result.equalsIgnoreCase("null")) {
            Long view = articleMapper.getViewById(id);
            // 对非热门文章设置过期时间
            if (view > 100) {
                stringRedisTemplate.opsForValue().set(id, String.valueOf(view));
            } else {
                stringRedisTemplate.opsForValue().set(id, String.valueOf(view), Duration.ofHours(10));
            }
            return view;
        } else {
            return Long.valueOf(result);
        }
    }

    @Override
    public void updateViews(String id) {
        Long view = stringRedisTemplate.execute(
                incrementScript,
                Collections.singletonList(id),
                "0",
                "360000"
        );
        articleMapper.updateViewById(id, view);
    }

}

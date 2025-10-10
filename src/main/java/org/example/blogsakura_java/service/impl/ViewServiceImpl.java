package org.example.blogsakura_java.service.impl;

import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.example.blogsakura_java.mapper.ArticleMapper;
import org.example.blogsakura_java.service.ViewService;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Slf4j
@Service
public class ViewServiceImpl implements ViewService {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Resource
    private ArticleMapper articleMapper;

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
    public void updateViews(String id, Long view) {
        if (view > 100) {
            stringRedisTemplate.opsForValue().set(id, String.valueOf(view));
        } else {
            stringRedisTemplate.opsForValue().set(id, String.valueOf(view), Duration.ofHours(10));
        }
        articleMapper.updateViewById(id, view);
    }
}

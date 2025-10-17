package org.example.blogsakura_java.controller;

import jakarta.annotation.Resource;
import org.example.blogsakura_java.pojo.Result;
import org.example.blogsakura_java.service.ESService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class ESController {
    @Resource
    private ESService esService;

    @PostMapping("/search/title")
    public Result findArticleByTitle(@RequestBody Map<String, Object> data) {
        return Result.success(esService.findArticleByTitle(data.get("keyword").toString()));
    }

    @PostMapping("/search")
    public Result findArticleByTitleOrContent(@RequestBody Map<String, Object> data) {
        return Result.success(esService.findArticleByTitleOrContent(data.get("keyword").toString()));
    }
}

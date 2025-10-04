package org.example.blogsakura_java.controller;

import cn.dev33.satoken.stp.StpUtil;
import lombok.extern.slf4j.Slf4j;
import org.example.blogsakura_java.pojo.*;
import org.example.blogsakura_java.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @PutMapping("/backend/articlelist")
    public Result findArticleList(@RequestBody ArticleQuery articleQuery) {
        log.info("查询所有数据");
        return Result.success(articleService.findArticleList(articleQuery));
    }

    @DeleteMapping("/backend/article/{id}")
    public Result deleteArticleById(@PathVariable String id) {
        log.info("删除id的文章");
        articleService.deleteArticleById(id);
        return Result.success();
    }

    @GetMapping("/backend/article/{id}")
    public Result getArticleById(@PathVariable String id){
        log.info("筛选id的文章");
        return Result.success(articleService.getArticleById(id));
    }

    @PostMapping("/backend/article")
    public Result insertArticle(@RequestBody ArticleInsert articleInsert){
        log.info("插入文章");
        articleService.insertArticle(articleInsert);
        return Result.success();
    }

    @PutMapping("/backend/article/{id}")
    public Result UpdateArticle(@RequestBody ArticleUpdate articleUpdate, @PathVariable String id){
        log.info("修改文章");
        articleService.updateArticle(articleUpdate, id);
        return Result.success();
    }

    @GetMapping("/article/{id}")
    public Result getHomeArticleById(@PathVariable String id){
        log.info("筛选id的文章");
        return Result.success(articleService.getArticleById(id));
    }

    @GetMapping("/home")
    public Result getHomeArticleList(){
        log.info("获取前端首页的所有文章列表信息");
        return Result.success(articleService.findHomeArticleList());
    }
}


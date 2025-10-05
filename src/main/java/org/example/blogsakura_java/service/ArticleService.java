package org.example.blogsakura_java.service;


import org.example.blogsakura_java.pojo.Article;
import org.example.blogsakura_java.pojo.ArticleInsert;
import org.example.blogsakura_java.pojo.ArticleQuery;
import org.example.blogsakura_java.pojo.ArticleUpdate;

import java.util.List;

public interface ArticleService {
    List<Article> getArticleList(ArticleQuery articleQuery);

    List<Article> getHomeArticleList();

    void deleteArticleById(String id);

    Article getArticleById(String id);

    void insertArticle(ArticleInsert articleInsert);

    void updateArticle(ArticleUpdate articleUpdate, String id);
}

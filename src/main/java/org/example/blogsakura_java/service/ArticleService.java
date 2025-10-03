package org.example.blogsakura_java.service;


import org.example.blogsakura_java.pojo.Article;
import org.example.blogsakura_java.pojo.ArticleInsert;
import org.example.blogsakura_java.pojo.ArticleQuery;

import java.util.List;

public interface ArticleService {
    List<Article> findArticleList(ArticleQuery articleQuery);

    List<Article> findHomeArticleList();

    void deleteArticleById(String id);

    Article getArticleById(String id);

    void insertArticle(ArticleInsert articleInsert);
}

package org.example.blogsakura_java.service.impl;

import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import lombok.extern.slf4j.Slf4j;
import org.example.blogsakura_java.mapper.ArticleMapper;
import org.example.blogsakura_java.mapper.ChannelMapper;
import org.example.blogsakura_java.pojo.Article;
import org.example.blogsakura_java.pojo.ArticleInsert;
import org.example.blogsakura_java.pojo.ArticleQuery;
import org.example.blogsakura_java.pojo.ArticleUpdate;
import org.example.blogsakura_java.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@Service
public class ArticleServiceImpl implements ArticleService {

    @Autowired
    private ArticleMapper articleMapper;
    @Autowired
    private ChannelMapper channelMapper;

    @Override
    public List<Article> getArticleList(ArticleQuery articleQuery) {
        if (articleQuery == null || articleQuery.getChannelName().isEmpty()) {
            return articleMapper.getArticleList();
        } else {
            return articleMapper.getArticleListByChannel(articleQuery.getChannelName());
        }
    }

    @Override
    public List<Article> getHomeArticleList() {
        return articleMapper.getArticleList();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteArticleById(String id) {
        articleMapper.deleteArticleById(id);
    }

    @Override
    public Article getArticleById(String id) {
        return articleMapper.getArticleById(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void insertArticle(ArticleInsert articleInsert, String id) {
        Article article = new Article();

        article.setId(id);
        String nowTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss"));
        article.setPublishDate(nowTime);
        article.setEditDate(nowTime);
        article.setTitle(articleInsert.getTitle());
        article.setContent(articleInsert.getContent());
        log.info("channelname:{}", articleInsert.getChannel());
        Long channelId = channelMapper.getChannelIdByName(articleInsert.getChannel());
        article.setChannelId(channelId);
        articleMapper.insertArticle(article);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateArticle(ArticleUpdate articleUpdate, String id) {
        Article article = new Article();
        article.setId(id);
        article.setTitle(articleUpdate.getTitle());
        article.setContent(articleUpdate.getContent());
        article.setChannelId(channelMapper.getChannelIdByName(articleUpdate.getChannel()));
        String nowTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss"));
        article.setEditDate(nowTime);
        article.setImageType(articleUpdate.getImageType());
        article.setImageUrl(articleUpdate.getImageUrl());

        articleMapper.updateArticle(article);
    }
}

package org.example.blogsakura_java.service.impl;

import com.alibaba.fastjson.JSON;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.SuppressLoggerChecks;
import org.elasticsearch.common.xcontent.XContentType;
import org.example.blogsakura_java.mapper.ArticleMapper;
import org.example.blogsakura_java.pojo.Article;
import org.example.blogsakura_java.pojo.ArticleDoc;
import org.example.blogsakura_java.service.ESService;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Slf4j
@Service
class ESServiceImpl implements ESService {

    @Resource
    private ArticleMapper articleMapper;

    @Resource
    private RestHighLevelClient client;

    @Override
    public void insertArticleDocById(String id) {
        try {
            // 先查询相应Article
            Article article = articleMapper.getArticleById(id);
            // 转为ArticleDoc类型
            ArticleDoc articleDoc = new ArticleDoc(article);

            // 1.准备文档数据
            IndexRequest request = new IndexRequest("article").id(articleDoc.getId());
            // 2.序列化
            request.source(JSON.toJSONString(articleDoc), XContentType.JSON);
            // 3.发送请求
            client.index(request, RequestOptions.DEFAULT);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteArticleDocById(String id) {
        try {
            // 1.准备删除请求
            DeleteRequest request = new DeleteRequest("article").id(id);
            // 2.发送请求
            client.delete(request, RequestOptions.DEFAULT);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 新增初始化操作
     */
    @Override
    @PostConstruct
    public void initDataToES() {
        log.info("开始初始化数据到Elastic Search");
        try {
            List<Article> articles = articleMapper.getArticleList();
            BulkRequest request = new BulkRequest();
            for (Article article : articles) {
                ArticleDoc articleDoc = new ArticleDoc(article);
                request.add(new IndexRequest("article").id(articleDoc.getId())
                        .source(JSON.toJSONString(articleDoc), XContentType.JSON));
            }
            client.bulk(request, RequestOptions.DEFAULT);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}

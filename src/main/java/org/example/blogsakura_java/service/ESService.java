package org.example.blogsakura_java.service;

public interface ESService {
    public void insertArticleDocById(String id);

    public void deleteArticleDocById(String id);

    // 新增初始化操作
    public void initDataToES();
}

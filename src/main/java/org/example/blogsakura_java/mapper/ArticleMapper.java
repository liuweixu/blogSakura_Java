package org.example.blogsakura_java.mapper;

import org.apache.ibatis.annotations.*;
import org.example.blogsakura_java.pojo.Article;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Mapper
public interface ArticleMapper {

    // 需要获取所有的文章列表信息
    @Select("select * from article")
    public List<Article> getArticleList();

    @Select("select a.*, c.name as channel_name from article a left join channel c on a.channel_id = c.id where c.name = #{channel}")
    public List<Article> getArticleListByChannel(String channel);

    @Select("select * from article where id = #{id}")
    public Article getArticleById(String id);

    @Delete("delete from article where id = #{id}")
    public void deleteArticleById(String id);

    @Update("update article set title = #{title}, content = #{content}, channel_id = #{channelId}, image_type = #{imageType}, image_url = #{imageUrl}, edit_date = #{editDate} where id = #{id}")
    public void updateArticle(Article article);

    @Insert("insert into article  (id, title, content, channel_id, image_type, image_url, publish_date, edit_date)" +
            "values (#{id}, #{title}, #{content}, #{channelId}, #{imageType}, #{imageUrl}, #{publishDate}, #{editDate})")
    public void insertArticle(Article article);

    @Select("select view from article where id = #{id}")
    public Long getViewById(String id);

    @Update("update article set view = #{view} where id = #{id}")
    public void updateViewById(String id, Long view);
}

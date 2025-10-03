package org.example.blogsakura_java.pojo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Article {
    private String id;
    private String title;
    private String content;
    private String channelId;
    private String imageType;
    private String imageUrl;
    private String publishDate;
    private String editDate;
}

package org.example.blogsakura_java.configure;

import jakarta.annotation.Resource;
import org.example.blogsakura_java.constants.RabbitMQArticleConstants;
import org.example.blogsakura_java.service.ESService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQArticleListener {
    @Resource
    private ESService esService;

    /**
     * 监听文章新增或修改的业务
     *
     * @param id
     */
    @RabbitListener(queues = RabbitMQArticleConstants.ARTICLE_INSERT_QUEUE)
    public void listenArticleInsertOrUpdate(String id) {
        esService.insertArticleDocById(id);
    }

    /**
     * 监听文章删除的业务
     *
     * @param id
     */
    @RabbitListener(queues = RabbitMQArticleConstants.ARTICLE_DELETE_QUEUE)
    public void listenArticleDelete(String id) {
        esService.deleteArticleDocById(id);
    }
}

package org.example.blogsakura_java.configure;

import org.example.blogsakura_java.constants.RabbitMQArticleConstants;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQArticleConfig {

    @Bean
    public TopicExchange topicExchange() {
        return new TopicExchange(RabbitMQArticleConstants.ARTICLE_EXCHANGE, true, false);
    }

    @Bean
    public Queue insertQueue() {
        return new Queue(RabbitMQArticleConstants.ARTICLE_INSERT_QUEUE, true);
    }

    @Bean
    public Queue deleteQueue() {
        return new Queue(RabbitMQArticleConstants.ARTICLE_DELETE_QUEUE, true);
    }

    @Bean
    public Binding insertQueueBinding() {
        return BindingBuilder.bind(insertQueue()).to(topicExchange()).with(RabbitMQArticleConstants.ARTICLE_INSERT_KEY);
    }

    @Bean
    public Binding deleteQueueBinding() {
        return BindingBuilder.bind(deleteQueue()).to(topicExchange()).with(RabbitMQArticleConstants.ARTICLE_DELETE_KEY);
    }
}

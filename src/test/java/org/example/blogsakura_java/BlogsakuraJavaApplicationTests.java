package org.example.blogsakura_java;

import com.google.gson.Gson;
import jakarta.annotation.Resource;
import org.example.blogsakura_java.controller.ArticleController;
import org.example.blogsakura_java.controller.UserController;
import org.example.blogsakura_java.mapper.UserMapper;
import org.example.blogsakura_java.pojo.Article;
import org.example.blogsakura_java.pojo.User;
import org.example.blogsakura_java.service.ViewService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Scope;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.io.ObjectInputStream;
import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

@SpringBootTest
public class BlogsakuraJavaApplicationTests {

    @Autowired
    private UserController userController;

    @Autowired
    private ApplicationContext applicationContext; // IOC对象


    @Autowired
    private StringRedisTemplate redisTemplate;
    @Autowired
    private StringRedisTemplate stringRedisTemplate;


    @Test
    public void contextLoads() {
        User user = new User();
        user.setMobile("18612345677");
        user.setCode("246810");

        System.out.println(user);
    }

//    @Test
//    public void jdbcTest() throws Exception {
//        //1. 注册驱动
//        Class.forName("com.mysql.cj.jdbc.Driver");
//
//        //2. 获取数据库连接
//        String url = "jdbc:mysql://127.0.0.1:3306/blog";
//        String username = "root";
//        String password = "12345678";
//        Connection connection = DriverManager.getConnection(url, username, password);
//
//        //3. 执行SQL
//        Statement statement = connection.createStatement();
//        String sql = "select * from article";
//        ResultSet resultSet = statement.executeQuery(sql);
//
//        List<Article> objects = new ArrayList<>();
//        //4. 处理SQL执行结果
//        while (resultSet.next()) {
//            String id = resultSet.getString("id");
//            String title = resultSet.getString("title");
//            String content = resultSet.getString("content");
//            Long channelId = resultSet.getLong("channel_id");
//            Integer imageType = resultSet.getInt("image_type");
//            String imageUrl = resultSet.getString("image_url");
//            String publishDate = resultSet.getString("publish_date");
//            String editDate = resultSet.getString("edit_date");
//            Article article = new Article(id, title, content, channelId, imageType, imageUrl, publishDate, editDate);
//            objects.add(article);
//        }
//
//        //5. 释放资源
//        statement.close();
//        connection.close();
//        resultSet.close();
//
//        //遍历集合
//        objects.forEach(System.out::println);
//    }

    @Test
    public void test() throws Exception {
        Class<?> classz = Class.forName("org.example.blogsakura_java.BlogsakuraJavaApplicationTests");
        Method contextLoads = classz.getMethod("contextLoads");
        contextLoads.invoke(classz.getDeclaredConstructor().newInstance());
    }


    @Test
    void testGetBean() {
        ArticleController controller = applicationContext.getBean(ArticleController.class);
        System.out.println(controller);

        ArticleController articleController = (ArticleController) applicationContext.getBean("articleController");
        System.out.println(articleController);
    }

    @Test
    void testTransisent() {
        User user = new User();
        user.setMobile("18612345677");
        user.setCode("246810");
        Gson gson = new Gson();
        String json = gson.toJson(user);
        System.out.println(json);
    }

    @Test
    void testRedis() {
        redisTemplate.opsForValue().set("name", "liu");
        System.out.println(redisTemplate.opsForValue().get("name"));
    }

    @Resource
    private ViewService viewService;


    @Test
    public void testConcurrentUpdateViews() throws InterruptedException {
        String articleId = "761011475501289473";
        redisTemplate.opsForValue().set(articleId, "100");

        int threadCount = 100; // 模拟20个用户同时刷新阅读数
        ThreadPoolExecutor executor = new ThreadPoolExecutor(threadCount,
                threadCount * 2 + 1,
                60L,
                TimeUnit.SECONDS,
                new LinkedBlockingQueue<>(1000));
        for (int i = 0; i < threadCount; i++) {
            executor.execute(() -> {
                try {
                    Long current = viewService.getViews(articleId);
                    Long newView = current + 1;
                    viewService.updateViews(articleId, newView);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
        }


        String redisResult = redisTemplate.opsForValue().get(articleId);
        Long dbResult = viewService.getViews(articleId);

        System.out.println("Redis 最终值：" + redisResult);
        System.out.println("数据库 最终值：" + dbResult);
        executor.shutdown();
    }

    @Test
    public void testConcurrentReadWrite() throws InterruptedException {
        String articleId = "761067900055326720";
        redisTemplate.opsForValue().set(articleId, "100");

        int readers = 100;
        int writers = 5;
        CountDownLatch latch = new CountDownLatch(readers + writers);
        ExecutorService executor = Executors.newFixedThreadPool(100);

        // 模拟多个读线程
        for (int i = 0; i < readers; i++) {
            executor.submit(() -> {
                try {
                    Long v = viewService.getViews(articleId);
                    System.out.println(Thread.currentThread().getName() + " 读：" + v);
                } finally {
                    latch.countDown();
                }
            });
        }

        // 模拟多个写线程
        for (int i = 0; i < writers; i++) {
            executor.submit(() -> {
                try {
                    Long current = Long.valueOf(redisTemplate.opsForValue().get(articleId));
                    Long newView = current + 10;
                    viewService.updateViews(articleId, newView);
                    System.out.println(Thread.currentThread().getName() + " 写：" + newView);
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();
        executor.shutdown();

        System.out.println("最终 Redis：" + redisTemplate.opsForValue().get(articleId));
        System.out.println("最终 DB：" + viewService.getViews(articleId));
    }


}

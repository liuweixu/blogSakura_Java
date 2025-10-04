package org.example.blogsakura_java.service.impl;

import org.example.blogsakura_java.mapper.UserMapper;
import org.example.blogsakura_java.pojo.User;
import org.example.blogsakura_java.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public User getUserByMobile(User user) {
        return userMapper.getUserByMobile(user);
    }
}

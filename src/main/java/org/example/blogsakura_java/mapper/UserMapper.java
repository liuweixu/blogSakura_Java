package org.example.blogsakura_java.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.example.blogsakura_java.pojo.User;

@Mapper
public interface UserMapper {

    @Select("select * from user where name = #{name}")
    public User getUserByName(String username);
}

package org.example.blogsakura_java.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.example.blogsakura_java.pojo.OperateLog;

@Mapper
public interface OperateLogMapper {

    @Insert("insert into operate_log (id, operate_time, operate_name, cost_time)" +
    "values (#{id}, #{operateTime}, #{operateName}, #{costTime});")
    public void insertOperateLog(OperateLog operateLog);

    @Delete("truncate table operate_log")
    public void deleteOperateLogs();
}

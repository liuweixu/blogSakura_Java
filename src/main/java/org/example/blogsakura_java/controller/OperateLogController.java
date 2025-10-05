package org.example.blogsakura_java.controller;

import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Delete;
import org.example.blogsakura_java.aop.Log;
import org.example.blogsakura_java.pojo.OperateLog;
import org.example.blogsakura_java.service.OperateLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RestController
@Slf4j
class OperateLogController {

    @Autowired
    private OperateLogService operateLogService;

    @DeleteMapping("/backend/logging")
    public void deleteOperateLogs(){
        log.info("清空日志");
        operateLogService.deleteOperateLogs();
    }

    @GetMapping("/backend/logging")
    public List<OperateLog> getOperateLogs(){
        log.info("获取日志列表");
        return operateLogService.getOperateLogs();
    }
}

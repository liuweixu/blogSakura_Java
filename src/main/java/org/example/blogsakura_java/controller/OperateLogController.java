package org.example.blogsakura_java.controller;

import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Delete;
import org.example.blogsakura_java.aop.Log;
import org.example.blogsakura_java.service.OperateLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@Slf4j
class OperateLogController {

    @Autowired
    private OperateLogService operateLogService;

    @DeleteMapping("/backend/deletelogs")
    @Log
    public void deleteOperateLogs(){
        log.info("清空日志");
        operateLogService.deleteOperateLogs();
    }
}

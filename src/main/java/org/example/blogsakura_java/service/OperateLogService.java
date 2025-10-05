package org.example.blogsakura_java.service;

import org.example.blogsakura_java.pojo.OperateLog;

import java.util.List;

public interface OperateLogService {
    void deleteOperateLogs();

    List<OperateLog> getOperateLogs();
}

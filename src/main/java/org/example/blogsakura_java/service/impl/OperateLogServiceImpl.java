package org.example.blogsakura_java.service.impl;

import org.example.blogsakura_java.mapper.OperateLogMapper;
import org.example.blogsakura_java.pojo.OperateLog;
import org.example.blogsakura_java.service.OperateLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OperateLogServiceImpl implements OperateLogService {
    @Autowired
    private OperateLogMapper operateLogMapper;

    @Override
    public void deleteOperateLogs() {
        operateLogMapper.deleteOperateLogs();
    }

    @Override
    public List<OperateLog> getOperateLogs() {
        return operateLogMapper.getOperateLogs();
    }
}

package org.example.blogsakura_java.service.impl;

import org.example.blogsakura_java.mapper.OperateLogMapper;
import org.example.blogsakura_java.service.OperateLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OperateLogServiceImpl implements OperateLogService {
    @Autowired
    private OperateLogMapper operateLogMapper;

    @Override
    public void deleteOperateLogs() {
        operateLogMapper.deleteOperateLogs();
    }
}

package org.example.blogsakura_java.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import org.example.blogsakura_java.aop.Log;
import org.example.blogsakura_java.pojo.Channel;
import org.example.blogsakura_java.pojo.Result;
import org.example.blogsakura_java.service.ChannelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ChannelController {

    @Autowired
    private ChannelService channelService;

    @GetMapping("/backend/channels")
    @Log
    public Result getChannels() {
        return Result.success(channelService.getChannels());
    }

    @GetMapping("/backend/channel/{id}")
    @Log
    public Result getChannelById(@PathVariable String id){
        return Result.success(channelService.getChannelById(id));
    }
}

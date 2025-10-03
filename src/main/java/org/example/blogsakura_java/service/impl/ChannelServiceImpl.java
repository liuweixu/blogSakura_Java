package org.example.blogsakura_java.service.impl;

import org.example.blogsakura_java.mapper.ChannelMapper;
import org.example.blogsakura_java.pojo.Channel;
import org.example.blogsakura_java.service.ArticleService;
import org.example.blogsakura_java.service.ChannelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChannelServiceImpl implements ChannelService {

    @Autowired
    private ChannelMapper channelMapper;

    @Override
    public List<Channel> getChannels() {
        return channelMapper.getChannels();
    }

    @Override
    public Channel getChannelById(String id) {
        return channelMapper.getChannelById(Long.valueOf(id));
    }
}

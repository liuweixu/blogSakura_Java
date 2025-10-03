package org.example.blogsakura_java.service;

import org.example.blogsakura_java.pojo.Channel;

import java.util.List;

public interface ChannelService {

    public List<Channel> getChannels();

    public Channel getChannelById(String id);
}

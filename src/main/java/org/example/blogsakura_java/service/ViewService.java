package org.example.blogsakura_java.service;

public interface ViewService {
    public Long getViews(String id);

    public void updateViews(String id, Long view);
}

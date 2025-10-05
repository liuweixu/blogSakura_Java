package org.example.blogsakura_java.aop;

import java.lang.annotation.*;

@Target({ElementType.METHOD})
@Documented
@Retention(RetentionPolicy.RUNTIME)
public @interface Log {
}

package com.sneakfit.backend.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
public class WebConfig {

    @Bean

    public WebMvcConfigurer corsConfigurer() {

    return new WebMvcConfigurer() {

        @Override

        public void addCorsMappings(CorsRegistry registry) {


            registry.addMapping("/**").allowedOrigins("http://localhost:5173").allowedMethods("*").allowedHeaders("*").maxAge(3600L).allowCredentials(true);


        }

    };
    }



}

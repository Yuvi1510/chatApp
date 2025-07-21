//package com.yuvraj.main.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import org.springframework.web.filter.CorsFilter;
//
//import java.util.Arrays;
//
//@Configuration
//public class GlobalCorsConfig {
//
//    @Bean
//    public CorsFilter corsFilter() {
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
//        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        config.setAllowedHeaders(Arrays.asList("*"));
//        config.setAllowCredentials(true);  // ⚠️ Important for sessions/cookies
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", config);
//
//        return new CorsFilter(source);
//    }
//}

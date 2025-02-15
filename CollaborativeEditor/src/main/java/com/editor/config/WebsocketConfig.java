package com.editor.config;

import com.editor.websockets.ReactiveYjsWebsocketHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.HandlerMapping;
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.config.EnableWebFlux;

import java.util.Map;

@Configuration
@EnableWebFlux
public class WebsocketConfig {

    @Bean
    public HandlerMapping webSocketHandlerMappinmg(ReactiveYjsWebsocketHandler yjsWebsocketHandler) {
        return new SimpleUrlHandlerMapping(Map.of("yjs", yjsWebsocketHandler), 1);
    }

    @Bean
    public WebSocketHandlerAdapter webSocketHandlerAdapter() {
        return new WebSocketHandlerAdapter();
    }

}

package de.javacook.websocketdemo;

import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;

import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/broadcast")
public class Broadcaster {

    //Erstellen einer "ConcurrentHashSet"
    final static Set<Session> userSessions = Collections.newSetFromMap(new ConcurrentHashMap<>());

    @OnOpen
    public void onOpen(Session userSession) {
        System.out.println("Neue Verbindung wurde aufgebaut");
        userSessions.add(userSession);
    }

    @OnClose
    public void onClose(Session userSession) {
        System.out.println("Verbindung wurde getrennt");
        userSessions.remove(userSession);
    }

    @OnMessage
    public void onMessage(String message, Session userSession) {
        System.out.println("User " + userSession.getId() + " sendet an alle " + userSessions.size() +
                " Teilnehmer: " + message);
        userSessions.forEach(
                session -> session.getAsyncRemote().sendText(message)
        );
    }

}
package com.yuvraj.main.controllers;

import com.yuvraj.main.entities.Message;
import com.yuvraj.main.entities.Room;
import com.yuvraj.main.payloads.MessageRequest;
import com.yuvraj.main.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:3000")
public class ChatController {
    @Autowired
    private RoomRepository roomRepository;

    // sending and receiving/publishing message
    @MessageMapping("/sendMessage/{roomId}")  // message will be sent to this url
    @SendTo("/topic/room/{roomId}")  // message will be published to this url also the client subscribes to this url
    public Message sendMessage(@DestinationVariable String roomId, @RequestBody MessageRequest request){
        Room room = this.roomRepository.findByRoomId(request.getRoomId());

        Message message = new Message();
        message.setContent(request.getContent());
        message.setSender(request.getSender());

        if(room != null){
            room.getMessages().add(message);
            this.roomRepository.save(room);
        }else{
            throw new RuntimeException("Room not found!");
        }

        return message;
    }

}

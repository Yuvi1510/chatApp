package com.yuvraj.main.controllers;

import com.yuvraj.main.entities.Message;
import com.yuvraj.main.entities.Room;
import org.springframework.beans.factory.annotation.Autowired;
import com.yuvraj.main.repositories.RoomRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/room")
@CrossOrigin("http://localhost:3000")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    // create room
    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody String roomId){
        // check if the room with this id already exists
        if(roomRepository.findByRoomId(roomId) == null){
            Room room = new Room();
            room.setRoomId(roomId);
            this.roomRepository.save(room);
            return new ResponseEntity<>(room, HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>("This id already exists",HttpStatus.BAD_REQUEST);
        }
    }


    // get room
    @GetMapping("/{roomId}")
    public  ResponseEntity<?> joinRoom(@PathVariable String roomId){
        Room room = this.roomRepository.findByRoomId(roomId);

        if(room == null){
            return ResponseEntity.badRequest().body("Room not found!!");
        }

        return  ResponseEntity.ok(room);
    }


    // get messages of room
    @GetMapping("/{roomId}/messages")
    public ResponseEntity<?> getMessage(
            @PathVariable String roomId,
            @RequestParam(value="page", defaultValue = "1", required = false) int page,
            @RequestParam(value = "size", defaultValue = "20", required = false) int size
    ){
        Room room = this.roomRepository.findByRoomId(roomId);

        if(room == null){
            return ResponseEntity.badRequest().body("Room not found!!");
        }

        int totalMessages = room.getMessages().size();
        int start = (page - 1) * size;
        int end = Math.min(start + size, totalMessages);

        List<Message> messages = room.getMessages().subList(start, end);

        return new ResponseEntity<>(messages,HttpStatus.OK);
    }
}

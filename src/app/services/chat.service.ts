import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessage } from '../interfaces/ChatMessageModel';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient : any;

  constructor() { }

  initConnectionSocket(){
    const url = '//localhost:300/chatsocket';

    const socket = new SockJS(url);
    
    this.stompClient = Stomp.over(socket);
  }


  joinRoom(roomId: string){
    this.stompClient.connect({}, () =>{
      this.stompClient.suscribe(`/topic/${roomId}`, (messages: any) =>{
        const messageContent = JSON.parse(messages.body);
        console.log(messageContent);
        
      })
    })
  }

  sendMessage(roomId: string, ChatMessage: ChatMessage){
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(ChatMessage));
  }
}

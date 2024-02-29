import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../interfaces/ChatMessageModel';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {


  constructor(private chatService: ChatService){}

  ngOnInit(): void{
    this.chatService.joinRoom("sala-1");

  }

  sendMessageOnChat() {
    const chatMessage = {
      message: 'Prueba',
      username: '1'
    } as ChatMessage;
    this.chatService.sendMessage("sala-1", chatMessage);
  }

}

import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../interfaces/ChatMessageModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {


  messageInput: string = '';
  userId: string = "";
  messageList: any=[] = [];


  constructor(private chatService: ChatService, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.userId = this.route.snapshot.params["userId"];
    this.chatService.joinRoom("sala-1");
    this.listenerMessage();

  }

  sendMessageOnChat() {
    console.log('Sending message with user:', this.userId);
    const chatMessage = {
      message: this.messageInput,
      user: this.userId
    } as ChatMessage;
    this.chatService.sendMessage("sala-1", chatMessage);
    this.messageInput = '';
  }
  

  listenerMessage() {
    this.chatService.getMessageSubject().subscribe((messages: any[]) => {
      this.messageList = messages.map((item: any) => ({
        ...item,
        message_side: item.user === this.userId ? 'sender' : 'receiver'
      }));
    });
  }
  
  

}

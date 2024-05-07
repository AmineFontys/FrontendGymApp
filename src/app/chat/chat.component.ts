import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chatservice';
import { FormsModule } from '@angular/forms'; 
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, NgFor], 
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  chatMessages: any[] = [];
  newChatMsg: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getMessages().subscribe((message: any) => {
      console.log("Received message:", message);  // This will show you what you're actually receiving
      this.chatMessages.push(message);
    });
  }

  ngOnDestroy(): void {
    this.chatService.close();
  }

  addChat(): void {
    if (this.newChatMsg.trim()) {
      this.chatService.sendMessage({ text: this.newChatMsg });
      this.newChatMsg = ''; // Clear input after sending
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/ChatService';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public messages: string[] = [];
  public messageText: string = '';

  constructor(private myService: ChatService) {}

  ngOnInit() {
    this.myService.getData().subscribe((message: string) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (this.messageText.trim() !== '') {
      this.myService.sendMessage(this.messageText);
      this.messageText = '';
    }
  }
}

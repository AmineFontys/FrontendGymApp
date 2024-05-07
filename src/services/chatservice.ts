import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chatSocket: WebSocketSubject<any>;
  private messageSubject: Subject<any> = new Subject<any>();

  constructor() {
    const wsConfig: WebSocketSubjectConfig<any> = {
      url: 'wss://localhost:32787/ws',
      deserializer: msg => {
        const fullMessage = msg.data;
        try {
          // Identify the point where the JSON part starts
          const separatorIndex = fullMessage.indexOf(' says: ');
          const identifier = fullMessage.substring(0, separatorIndex);
          const jsonPart = fullMessage.substring(separatorIndex + 7).trim(); // 7 to skip ' says: '

          if (/^[\{].*[\}]$/.test(jsonPart)) {
            const messageObj = JSON.parse(jsonPart);
            return { id: identifier, text: messageObj.text };  // Return structured message
          }
          // Fallback to handle unexpected formats
          return { id: identifier, text: jsonPart };
        } catch (error) {
          console.error('Failed to parse message:', fullMessage, error);
          return { id: 'Parsing error', text: fullMessage };  // Error handling
        }
      }
    };

    this.chatSocket = webSocket(wsConfig);
    this.chatSocket.subscribe(
      msg => {
        if (msg) {
          this.messageSubject.next(msg);
        }
      },
      err => console.error('WebSocket error:', err),
      () => console.log('WebSocket connection completed.')
    );
  }

  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  sendMessage(message: any): void {
    this.chatSocket.next(message);
  }

  close(): void {
    this.chatSocket.complete();
  }
}

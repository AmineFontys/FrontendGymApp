import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private connection: signalR.HubConnection;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:32771/myHub')
      .build();
    this.connection.start().catch((err: any) => console.error(err));
  }

  getData(): Observable<string> {
    return new Observable(observer => {
      this.connection.on('data', (data: string | undefined) => {
        observer.next(data);
      });
    });
  }

  sendMessage(message: string): Promise<void> {
    return this.connection.invoke('SendData', message)
        .catch((err: any) => console.error(err));
    }
}

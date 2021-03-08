import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TokenService} from 'src/app/core/token.service';
import {WebSocketService} from '../../core/websocket.service';
import {Message} from 'src/app/communication/chat/chat.component';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient, private webSocketService: WebSocketService, private tokenService: TokenService) {
  }


  getMessages(conversationId: number): Observable<Message[]> {
    return this.http.get<Message[]>('http://localhost:8080/chat/' + this.tokenService.getUserId() + '/' + conversationId);
  }

  subcribeToMessages(): Observable<Message> {
    return this.webSocketService.subscribeToWebSocket<Message>('/user/' + this.tokenService.getUserId() + '/messages');
  }

  sendMessage(message: Message) {
    this.webSocketService.publishToWebSocket(
      '/app/message', message);
  }
}

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TokenService} from 'src/app/core/token.service';
import {WebSocketService} from '../../core/websocket.service';
import {Message} from 'src/app/communication/chat/chat.component';
import {Conversation} from '../friend-list/friend-list.component';


@Injectable({
  providedIn: 'root'
})
export class FriendListService {
  constructor(private http: HttpClient, private webSocketService: WebSocketService, private tokenService: TokenService) {
  }

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>('http://localhost:8080/conversation/' + this.tokenService.getUserId());
  }
  subcribeToMessages(): Observable<Message> {
    return this.webSocketService.subscribeToWebSocket<Message>('/user/' + this.tokenService.getUserId() + '/messages');
  }
}

import {ChangeDetectionStrategy, Component, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TokenService} from '../../core/token.service';
import {WebSocketService} from '../../core/websocket.service';


class Conversation {
  id: number;
  conversationName: string;
  lastMessage: string;
  avatarUrl: string;
}

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css'],
})

export class FriendListComponent implements OnInit {
  conversations: Conversation[] = [];

  constructor(private tokenService: TokenService, private http: HttpClient, private webSocketService: WebSocketService) {
  }

  ngOnInit(): void {
    this.getConversations();
    this.subcribeToConversations();
    console.log(this.conversations);
  }


  getConversations(): void {
    this.http.get<Conversation[]>('http://localhost:8080/conversation/' + this.tokenService.getUserId()).subscribe(Response => {

      this.conversations = this.conversations.concat(Response);
      console.log(this.conversations);
    });
  }

  subcribeToConversations(): void {
    this.webSocketService.subscribeToWebSocket<Conversation>('/user/3/msg').subscribe(Response => {
        if (this.conversations.find(x => x.id === Response.id)) {
          this.conversations[this.conversations.findIndex(x => x.id === Response.id)] = Response;
        } else {
          this.conversations.push(Response);
        }
      }
    );
    //this.webSocketService.publishToWebSocket('/app/message', {id: 3, conversationName: 'asdasd', lastMessage: 'asdasd'});
  }


  selectConversation(i: number) {

  }

  costam(i: number) {
    console.log(this.conversations);
  }
}

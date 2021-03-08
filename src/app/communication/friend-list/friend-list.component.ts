import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '../../core/token.service';
import {WebSocketService} from '../../core/websocket.service';
import {FriendListService} from '../shared/friend-list.service';

export class Conversation {
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
  @Output() conversationSelected: EventEmitter<Conversation> = new EventEmitter<Conversation>();

  constructor(private tokenService: TokenService, private friendListService: FriendListService) {
  }

  ngOnInit(): void {
    this.getConversations();
    this.subcribeToConversations();
  }


  getConversations(): void {
    this.friendListService.getConversations().subscribe(Response => {

      this.conversations = this.conversations.concat(Response);
      console.log(typeof (this.conversations));
    });
  }

  subcribeToConversations(): void {
    this.friendListService.subcribeToMessages().subscribe(Response => {
        const i = this.conversations.findIndex(x => x.id === Response.conversationId);
        this.conversations[i].lastMessage = Response.text;
        const conversationWithNewMessage = this.conversations[i];
        this.conversations.splice(i, 1);
        this.conversations.unshift(conversationWithNewMessage);
      }
    );
  }


  selectConversation(i: Conversation) {
    console.log(this.conversations);
    this.conversationSelected.emit(i);
  }

}

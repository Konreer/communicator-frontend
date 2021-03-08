import {Component, ElementRef, Injectable, OnInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {TokenService} from '../../core/token.service';
import {WebSocketService} from '../../core/websocket.service';
import {HttpClient} from '@angular/common/http';
import {Conversation} from '../friend-list/friend-list.component';
import {ChatService} from '../shared/chat.service';

export class Message {
  text: string;
  date: Date;
  ownerId: number;
  conversationId: number;
  avatarUrl: string;

  constructor(text: string, conversationId: number, ownerId: number, date: Date) {
    this.text = text;
    this.conversationId = conversationId;
    this.ownerId = ownerId;
    this.date = date;
  }
}


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  @ViewChild('chat') private myScrollContainer: ElementRef;
  messages: Message[] = [];
  userId: number;
  activeConversation: Conversation;
  messageToSend: string;

  constructor(private tokenService: TokenService,  private chatService: ChatService) {
    this.userId = tokenService.getUserId();
  }

  ngOnInit(): void {
    this.subcribeToMessages();
  }

  getMessages(): void {
    this.chatService.getMessages(this.activeConversation.id).subscribe(Response => {
        Response.forEach(msg => {
          msg.date = new Date(Date.parse(msg.date.toString()));
        });
        this.messages = Response;
        this.scrollToBottomOfChat();
      });
  }


  subcribeToMessages(): void {
    this.chatService.subcribeToMessages().subscribe(Response => {
        if (Response.conversationId === this.activeConversation.id) {
          this.messages.push(Response);
        }
      }
    );
  }

  sendMessage(event: any) {
    event.preventDefault();
    this.chatService.sendMessage(new Message(
      event.target.value, this.activeConversation.id,
      this.tokenService.getUserId(),
      new Date()));
    event.target.value = '';
  }
  private scrollToBottomOfChat(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  public showConversation(selectedConversation: Conversation) {
    this.activeConversation = selectedConversation;
    this.getMessages();
  }

}

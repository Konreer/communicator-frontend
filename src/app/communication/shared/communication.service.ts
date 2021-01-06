import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/core/token.service';
import { User } from 'src/app/shared/user';
import { WebSocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private convUrl: string = 'http://localhost:8080/users';

  constructor(private http: HttpClient, private webSocketService: WebSocketService, private tokenService: TokenService) { }

  getAllUsersByKeyword(keyword: string): Observable<User[]>{
    return this.http.get<User[]>(`${this.convUrl}/${keyword}`);
  }

  sendInvitationToFriendsList(userId: number, invitedUserId: number): void{
    this.webSocketService.publishToWebSocket(`/app/${userId}/friends/${invitedUserId}`, ' ');
  }

  listenToInvitations(): Observable<any>{
    return this.webSocketService.subscribeToWebSocket(`/user/${this.tokenService.getUserId()}/invitations`);
  }

}

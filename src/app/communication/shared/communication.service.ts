import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/core/token.service';
import { User } from 'src/app/shared/user';
import { WebSocketService } from '../../core/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private convUrl: string = 'http://localhost:8080/users';

  constructor(private http: HttpClient, private webSocketService: WebSocketService, private tokenService: TokenService) { }

  getAllUsersByKeyword(keyword: string): Observable<User[]>{
    return this.http.get<User[]>(`${this.convUrl}/${keyword}`);
  }

  getAllInvittations(userId: number): Observable<User[]>{
    return this.http.get<User[]>(`${this.convUrl}/${userId}/invitations`);
  }

  sendInvitationToFriendsList(userId: number, invitedUserId: number): void{
    this.webSocketService.publishToWebSocket(`/app/${userId}/friends/${invitedUserId}`, invitedUserId);
  }

  listenToInvitations(): Observable<any>{
    return this.webSocketService.subscribeToWebSocket(`/user/${this.tokenService.getUserId()}/invitations`);
  }

  acceptInvitation(friendId: number): Observable<number>{
    return this.http.put<number>(`${this.convUrl}/${this.tokenService.getUserId()}/invitations/${friendId}`, null);
  }

  removeContact(friendId: number): Observable<any>{
    return this.http.delete(`${this.convUrl}/${this.tokenService.getUserId()}/friends/${friendId}`);
  }

}

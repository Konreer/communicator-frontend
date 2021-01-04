import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/user';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private convUrl: string = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  getAllUsersByKeyword(keyword: string): Observable<User[]>{
    return this.http.get<User[]>(`${this.convUrl}/${keyword}`);
  }

  sendInvitationToFriendsList(userId: number, invitedUserId: number): Observable<number>{
    return this.http.post<number>(`${this.convUrl}/${userId}/friends/${invitedUserId}`, {});
  }
}

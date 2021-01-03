import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from '../../core/token.service';

class Friend {
  contactId: number;
  contactName: string;
  contactSurname: string;
  avatarUrl: string;
}

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  // friends: any = [{ name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }];
  friends: Friend[];
  private http: HttpClient;


  constructor(private tokenService: TokenService) {
  }
  getFriends(): Observable<Friend[]> {
    return this.http.get<Friend[]>('localhost:8080/' + this.tokenService.getUserId() + '/friends');
  }

  ngOnInit(): void {
    this.getFriends();
  }

  costam() {

  }
}

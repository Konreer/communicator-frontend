import {Component, OnInit} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  friends: any = [{ name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }, { name: 'koskos', surname: 'psikuta' }];
  hover = false;

  constructor() {
  }

  ngOnInit(): void {

  }

  colorchange(index) {
    this.hover = true;
    this.friends[index].backgroundColor = 'black';

  }

  costam() {

  }
}

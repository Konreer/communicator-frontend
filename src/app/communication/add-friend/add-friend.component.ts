import { Component, OnInit } from '@angular/core';
import {faUserPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from 'src/app/core/token.service';
import { User } from 'src/app/shared/user';
import { CommunicationService } from '../shared/communication.service';

@Component({
  selector: 'add-friend-button',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {

  selectedPersonId: number = -1;
  possibleFriendsList: User[] = []; 
  faUserPlus: IconDefinition = faUserPlus;

  constructor(private modalService: NgbModal, private communicationService: CommunicationService, private tokenService: TokenService) { }

  ngOnInit(): void {
  }

  openModal(content): void{
    this.selectedPersonId = -1;
    this.possibleFriendsList = [];
    this.modalService.open(content, {centered: true});
  }

  getUsersByKeyword(keyword: string): void{
    this.communicationService.getAllUsersByKeyword(keyword).subscribe({
      next: response => this.possibleFriendsList = response.length ? response : [],
      error: err => console.log(err)
    })
  }

  sendInvitationToFriendsList(): void{
    this.modalService.dismissAll();
    this.communicationService.sendInvitationToFriendsList(this.tokenService.getUserId(), this.selectedPersonId);
  }

  setSelectedPersonId(id: number): void{
    this.selectedPersonId = id;
  }

  setBackgroundColor(id: number): any{
    return id === this.selectedPersonId ? {'background-color':'#a6a6a7', 'color': 'white'} : {'background-color':'white', 'color': 'black'};
  }

}

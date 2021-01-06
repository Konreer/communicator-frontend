import { Component, OnDestroy, OnInit } from '@angular/core';
import { faUserFriends, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/shared/user';
import { CommunicationService } from '../shared/communication.service';

@Component({
  selector: 'app-invitations-button',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {

  faUserFriends: IconDefinition = faUserFriends;

  // invitationList: User[] = []
  invitationList: number[] = []

  constructor(private modalService: NgbModal, private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.communicationService.listenToInvitations().subscribe({
        next: response => {
          console.log(response);
          this.invitationList.push(response);},
        error: err => console.log(err)
      })
  }

  
  openModal(content): void{
    this.modalService.open(content, {centered: true});
  }

}

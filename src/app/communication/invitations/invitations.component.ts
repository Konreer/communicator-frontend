import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCheck, faTimesCircle, faUserFriends, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { TokenService } from 'src/app/core/token.service';
import { User } from 'src/app/shared/user';
import { CommunicationService } from '../shared/communication.service';

@Component({
  selector: 'app-invitations-button',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit, OnDestroy {

  incomingInvitations$: Subscription;
  faUserFriends: IconDefinition = faUserFriends;
  faTimesCircle: IconDefinition = faTimesCircle;
  faCheck: IconDefinition = faCheck;
  invitationList: User[] = [];

  constructor(private modalService: NgbModal, private communicationService: CommunicationService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.incomingInvitations$ = this.communicationService.listenToInvitations().subscribe({
      next: response =>  this.invitationList.push(response),
      error: err => console.log(err)
    });

    this.communicationService.getAllInvittations(this.tokenService.getUserId()).subscribe({
      next: response => this.invitationList = response,
      error: err => console.log(err)
    })
  }

  ngOnDestroy(): void {
    this.incomingInvitations$.unsubscribe();
  }

  openModal(content): void{
    this.modalService.open(content, {centered: true});
  }

  acceptInvitation(acceptedFriendId: number): void{
      this.communicationService.acceptInvitation(acceptedFriendId).subscribe({
        next: response => console.log(response),
        error: err => console.log(err)
      });

      this.modalService.dismissAll();
      this.removeInvitationFromList(acceptedFriendId);
  }

  rejectInvitation(rejectedFriendId: number): void{
    this.communicationService.removeContact(rejectedFriendId).subscribe({
      error: err => console.log(err)
    });

    this.modalService.dismissAll();
    this.removeInvitationFromList(rejectedFriendId);
  }

  private removeInvitationFromList(friendId: number): void{
    this.invitationList = this.invitationList.filter(user => user.id !== friendId);
  }
}
import { Component, OnInit } from '@angular/core';
import { faUserFriends, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/shared/user';
import { WebSocketService } from '../shared/websocket.service';

@Component({
  selector: 'app-invitations-button',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {

  faUserFriends: IconDefinition = faUserFriends;

  invitationList: User[] = []

  constructor(private modalService: NgbModal, private websocketService: WebSocketService) { }

  ngOnInit(): void {
    this.websocketService.connectToWebSocket();
  }

  
  openModal(content): void{
    this.modalService.open(content, {centered: true});
  }

}

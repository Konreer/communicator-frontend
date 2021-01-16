import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UserInterfaceComponent } from './user-interface/user-interface.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LogOutComponent } from './log-out/log-out.component';
import { InvitationsComponent } from './invitations/invitations.component';
import { ChatComponent } from './chat/chat.component';


@NgModule({
  declarations: [
      UserInterfaceComponent,
      FriendListComponent,
      AddFriendComponent,
      LogOutComponent,
      InvitationsComponent,
      ChatComponent
    ],
  imports: [
    NgbModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(
      [
        {path: "menu", component: UserInterfaceComponent}
      ]
    )
  ],
  exports: [
      UserInterfaceComponent,
      FriendListComponent
  ]
})
export class CommunicationModule { }

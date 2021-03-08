import {Component, OnInit, ViewChild} from '@angular/core';
import { faCog, faSignOutAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {Conversation} from '../friend-list/friend-list.component';
import {ChatComponent} from '../chat/chat.component';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css']
})
export class UserInterfaceComponent implements OnInit {

  @ViewChild(ChatComponent) child: ChatComponent;
  faCog: IconDefinition = faCog;

  constructor() { }

  ngOnInit(): void {
  }

  filterUserContacts(userSearch: string): void{
    console.log(userSearch);
  }

  selectConversation(conversation: Conversation) {
    this.child.showConversation(conversation);
  }
}

import { Component, OnInit } from '@angular/core';
import { faCog, faSignOutAlt, faUserPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css']
})
export class UserInterfaceComponent implements OnInit {

  faSignOutAlt: IconDefinition = faSignOutAlt;
  faCog: IconDefinition = faCog;
  faUserPlus: IconDefinition = faUserPlus;

  constructor() { }

  ngOnInit(): void {
  }

  filterUserContacts(userSearch: string): void{
    console.log(userSearch);
  }
}

import { Component, OnInit } from '@angular/core';
import { faCog, faSignOutAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css']
})
export class UserInterfaceComponent implements OnInit {


  faCog: IconDefinition = faCog;

  constructor() { }

  ngOnInit(): void {
  }

  filterUserContacts(userSearch: string): void{
    console.log(userSearch);
  }
}

import { Component, OnInit } from '@angular/core';
import { faSignOutAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  faSignOutAlt: IconDefinition = faSignOutAlt;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(): void{
    this.authService.logout();
  }

}

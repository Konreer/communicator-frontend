import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  registrationFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService,) {
    this.registrationFormGroup = this.formBuilder.group({
      password: [],
      profile: []
    });
  }

  ngOnInit(): void {
  }

  onSubmit() : void{
    this.authService.registerUser(Object.assign(this.registrationFormGroup.controls.password.value, this.registrationFormGroup.controls.profile.value))
      .subscribe({
        next: response => {
          this.router.navigate(['/login'])
        },
        error: err => {
          console.log(err)
        } 
      })
  }
  
}
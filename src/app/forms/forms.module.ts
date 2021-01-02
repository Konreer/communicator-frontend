import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordFormComponent } from './password-form/password-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PasswordFormComponent,
    RegisterFormComponent,
    ProfileFormComponent,
    LoginFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(
      [
        { path: 'register', component: RegisterFormComponent },
        { path: 'login', component: LoginFormComponent }
    ]
    )
  ],
  exports: [
    PasswordFormComponent,
    RegisterFormComponent,
    LoginFormComponent,
    ProfileFormComponent
  ]
})
export class MyFormsModule { }

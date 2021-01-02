import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { SharedModule } from './forms/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RegisterFormComponent } from './forms/register-form/register-form.component';
import { MyFormsModule } from './forms/forms.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MyFormsModule,
    SharedModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginFormComponent},
      { path: 'register', component: RegisterFormComponent},
      { path: '**', redirectTo: 'news', pathMatch: 'full'}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

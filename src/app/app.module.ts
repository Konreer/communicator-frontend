import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RegisterFormComponent } from './forms/register-form/register-form.component';
import { MyFormsModule } from './forms/forms.module';
import { CommunicationModule } from './communication/communication.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JwtInterceptor } from './shared/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    MyFormsModule,
    CommunicationModule,
    SharedModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginFormComponent},
      { path: 'register', component: RegisterFormComponent},
      { path: '**', redirectTo: 'news', pathMatch: 'full'}
    ]),
  ],
  providers: [
    NgbActiveModal,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

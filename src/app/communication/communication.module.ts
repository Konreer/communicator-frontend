import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UserInterfaceComponent } from './user-interface/user-interface.component';


@NgModule({
  declarations: [
      UserInterfaceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(
      [
        {path: "menu", component: UserInterfaceComponent}
      ]
    )
  ],
  exports: [
      UserInterfaceComponent
  ]
})
export class CommunicationModule { }

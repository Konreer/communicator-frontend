import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        FontAwesomeModule,
        FormsModule,
        CommonModule,
    ],
    exports: [
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        SearchBarComponent,

    ],
    declarations: [SearchBarComponent]
})
export class SharedModule { }
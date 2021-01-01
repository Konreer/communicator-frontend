import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,

    ],
    declarations: []
})
export class SharedModule { }
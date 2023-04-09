import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';



@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    RouterModule.forChild([]),
    SharedModule
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }

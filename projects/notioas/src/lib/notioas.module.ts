import { NgModule} from '@angular/core';
import { NotioasComponent } from './notioas.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MomentModule } from 'ngx-moment';

// import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [NotioasComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    MomentModule,
    // BrowserModule,
  ],
  exports: [NotioasComponent],
})
export class NotioasModule { }

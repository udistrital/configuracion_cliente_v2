import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import {
  DinamicformComponent,
  LoadingComponent,
} from './components';


@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  exports: [DinamicformComponent, LoadingComponent],
  declarations: [DinamicformComponent, LoadingComponent],
  entryComponents: [],
})

export class ThemeModule {

}

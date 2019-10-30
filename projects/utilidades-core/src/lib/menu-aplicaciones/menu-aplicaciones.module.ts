import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuAplicacionesComponent } from './menu-aplicaciones.component';

@NgModule({
  declarations: [MenuAplicacionesComponent],
  imports: [
    CommonModule,
  ],
  exports: [MenuAplicacionesComponent],
})
export class MenuAplicacionesModule { }

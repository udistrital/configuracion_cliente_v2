import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuOpcionComponent } from './menu_opcion.component';
import { ListMenuOpcionComponent } from './list-menu_opcion/list-menu_opcion.component';


const routes: Routes = [{
  path: '',
  component: MenuOpcionComponent,
  children: [{
    path: 'list-menu_opcion',
    component: ListMenuOpcionComponent,
  }],
}];

@NgModule({
  imports: [
      RouterModule.forChild(routes),
  ],
  exports: [
      RouterModule,
  ],
})

export class MenuOpcionRoutingModule { }

export const routedComponents = [
  MenuOpcionComponent,
  ListMenuOpcionComponent,
];

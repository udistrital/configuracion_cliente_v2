import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificacionComponent } from './notificacion.component';
import { ListNotificacionComponent } from './list-notificacion/list-notificacion.component';
import { CrudNotificacionComponent } from './crud-notificacion/crud-notificacion.component';
import { ListadoComponent } from './listado/listado.component';


const routes: Routes = [{
  path: '',
  component: NotificacionComponent,
  children: [{
    path: 'list-notificacion',
    component: ListNotificacionComponent,
  }, {
    path: 'crud-notificacion',
    component: CrudNotificacionComponent,
  }, {
    path: 'listado',
    component: ListadoComponent,
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

export class NotificacionRoutingModule { }

export const routedComponents = [
  ListadoComponent,
  NotificacionComponent,
  ListNotificacionComponent,
  CrudNotificacionComponent,
];

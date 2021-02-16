import { NotificacionEstadoUsuarioRoutingModule, routedComponents } from './notificacion_estado_usuario-routing.module';
import { NgModule } from '@angular/core';
import { ConfiguracionService } from '../../@core/data/configuracion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
;
import { SharedModule } from '../../shared/shared.module';
import { CrudNotificacionEstadoUsuarioComponent } from './crud-notificacion_estado_usuario/crud-notificacion_estado_usuario.component';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    
    NotificacionEstadoUsuarioRoutingModule,
    Ng2SmartTableModule,
    
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ConfiguracionService,

  ],
  exports: [
    CrudNotificacionEstadoUsuarioComponent,
  ],
})
export class NotificacionEstadoUsuarioModule { }

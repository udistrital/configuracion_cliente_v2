import { NotificacionEstadoRoutingModule, routedComponents } from './notificacion_estado-routing.module';
import { NgModule } from '@angular/core';
import { ConfiguracionService } from '../../@core/data/configuracion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
;
import { SharedModule } from '../../shared/shared.module';
import { CrudNotificacionEstadoComponent } from './crud-notificacion_estado/crud-notificacion_estado.component';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,

    NotificacionEstadoRoutingModule,
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
    CrudNotificacionEstadoComponent,
  ],
})
export class NotificacionEstadoModule { }

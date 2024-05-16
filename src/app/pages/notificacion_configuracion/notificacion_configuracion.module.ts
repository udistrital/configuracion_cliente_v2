import { NotificacionConfiguracionRoutingModule, routedComponents } from './notificacion_configuracion-routing.module';
import { NgModule } from '@angular/core';
import { ConfiguracionService } from '../../@core/data/configuracion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
;
import { SharedModule } from '../../shared/shared.module';
import { CrudNotificacionConfiguracionComponent } from './crud-notificacion_configuracion/crud-notificacion_configuracion.component';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,

    NotificacionConfiguracionRoutingModule,
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
    CrudNotificacionConfiguracionComponent,
  ],
})
export class NotificacionConfiguracionModule { }

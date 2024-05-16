import { AplicacionRoutingModule, routedComponents } from './aplicacion-routing.module';
import { NgModule } from '@angular/core';
import { ConfiguracionService } from '../../@core/data/configuracion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from '../../shared/shared.module';
import { CrudAplicacionComponent } from './crud-aplicacion/crud-aplicacion.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    AplicacionRoutingModule,
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
    CrudAplicacionComponent,
  ],
})
export class AplicacionModule { }

import { ParametroRoutingModule, routedComponents } from './parametro-routing.module';
import { NgModule } from '@angular/core';
import { ConfiguracionService } from '../../@core/data/configuracion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
;
import { SharedModule } from '../../shared/shared.module';
import { CrudParametroComponent } from './crud-parametro/crud-parametro.component';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    
    ParametroRoutingModule,
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
    CrudParametroComponent,
  ],
})
export class ParametroModule { }

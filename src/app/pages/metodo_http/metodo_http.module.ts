import { MetodoHttpRoutingModule, routedComponents } from './metodo_http-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ConfiguracionService } from '../../@core/data/configuracion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
;
import { SharedModule } from '../../shared/shared.module';
import { CrudMetodoHttpComponent } from './crud-metodo_http/crud-metodo_http.component';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    ThemeModule,
    MetodoHttpRoutingModule,
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
    CrudMetodoHttpComponent,
  ],
})
export class MetodoHttpModule { }

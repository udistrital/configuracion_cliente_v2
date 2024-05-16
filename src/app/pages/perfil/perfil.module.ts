import { PerfilRoutingModule, routedComponents } from './perfil-routing.module';
import { NgModule } from '@angular/core';
import { ConfiguracionService } from '../../@core/data/configuracion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
;
import { SharedModule } from '../../shared/shared.module';
import { CrudPerfilComponent } from './crud-perfil/crud-perfil.component';

import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    PerfilRoutingModule,
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
    CrudPerfilComponent,
  ],
})
export class PerfilModule { }

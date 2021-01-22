import { AplicacionRoutingModule, routedComponents } from './aplicacion-routing.module';
import { NgModule } from '@angular/core';
import { ConfiguracionService } from '../../@core/data/configuracion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudAplicacionComponent } from './crud-aplicacion/crud-aplicacion.component';
import { ToasterService } from 'angular2-toaster';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ThemeModule } from './../../@theme/theme.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    MatCardModule,
    MatTabsModule,
    AplicacionRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ConfiguracionService,
    ToasterService,
  ],
  exports: [
    CrudAplicacionComponent,
  ],
})
export class AplicacionModule { }

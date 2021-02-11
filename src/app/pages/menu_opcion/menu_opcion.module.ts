import { MenuOpcionRoutingModule, routedComponents } from './menu_opcion-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ConfiguracionService } from '../../@core/data/configuracion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from '../../shared/shared.module';
import { CrudMenuOpcionComponent } from './crud-menu_opcion/crud-menu_opcion.component';
import { TreeModule } from '@circlon/angular-tree-component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    ThemeModule,
    MenuOpcionRoutingModule,
    Ng2SmartTableModule,
    SharedModule,
    TreeModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ConfiguracionService,
  ],
  exports: [
    CrudMenuOpcionComponent,
  ],
})
export class MenuOpcionModule { }

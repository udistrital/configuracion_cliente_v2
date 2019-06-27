import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { SharedModule } from '../shared/shared.module';
import { ConfiguracionService } from '../@core/data/configuracion.service';
import { MenuService } from '../@core/data/menu.service';
import { PlanCuentasModule } from './plan-cuentas/plan-cuentas.module';



const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    SharedModule,
    PlanCuentasModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  providers: [
    ConfiguracionService,
    MenuService,
  ],
})
export class PagesModule {
}
 
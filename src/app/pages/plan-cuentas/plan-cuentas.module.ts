import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { CommonModule } from '@angular/common';
import { PlanCuentasRoutingModule, routedComponents } from './plan-cuentas-routing.module';
import { GestionPlanCuentasComponent } from './gestion-plan-cuentas/gestion-plan-cuentas.component';
import { NbTreeGridModule, NbSelectModule } from '@nebular/theme';
import { ArbolComponent } from './arbol/arbol.component';




@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    ThemeModule,
    CommonModule,
    PlanCuentasRoutingModule,
    NbTreeGridModule,
    NbSelectModule,
  ],
  exports: [
    ArbolComponent
  ]
})
export class PlanCuentasModule { }

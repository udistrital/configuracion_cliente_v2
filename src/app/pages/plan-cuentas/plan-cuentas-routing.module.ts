import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArbolComponent, FsIconAComponent} from './arbol/arbol.component';
import { ComprobacionApropiacionInicialComponent } from './comprobacion-apropiacion-inicial/comprobacion-apropiacion-inicial.component';
import { GestionPlanCuentasComponent } from './gestion-plan-cuentas/gestion-plan-cuentas.component';
import { RubrosComponent } from './rubros/rubros.component';
import { ApropiacionesComponent } from './apropiaciones/apropiaciones.component';


const routes: Routes = [{
  path: 'arbol',
  component: ArbolComponent,
},
{
  path: 'gestion-plan-cuentas',
  component: GestionPlanCuentasComponent,
},
{
  path: 'rubros',
  component: RubrosComponent,
},
{
  path: 'apropiaciones',
  component: ApropiacionesComponent,
},{
  path: 'nb-fs-icon',
  component: FsIconAComponent,
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanCuentasRoutingModule { }

export const routedComponents = [
  ArbolComponent,
  GestionPlanCuentasComponent,
  RubrosComponent,
  ApropiacionesComponent,
  ComprobacionApropiacionInicialComponent,
  FsIconAComponent,
];
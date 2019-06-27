import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gestion-plan-cuentas',
  templateUrl: './gestion-plan-cuentas.component.html',
  styleUrls: ['./gestion-plan-cuentas.component.scss']
})
export class GestionPlanCuentasComponent implements OnInit {
  selectedOption : any;
  op_plan_cuentas: any[] = [
    { option: 'Rubros' },
    { option: 'Apropiaciones' },
    { option: 'Fuentes de Financiamiento' }];

  constructor() {
    this.selectedOption = '';
   }

  ngOnInit() {
  }

  onSelect(selectedItem: any) {
    console.log("Opcion Seleccionado es: ", selectedItem , this.selectedOption); 
   }
}

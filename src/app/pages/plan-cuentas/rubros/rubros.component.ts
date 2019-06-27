import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RubroService } from '../../../@core/data/rubro.service';
import { Rubro } from '../../../@core/data/models/rubro';
import { Validators } from '@angular/forms';
import { FORM_INFO_RUBRO } from './form_info_rubro';
import { RubroHelper } from '../../../helpers/rubros/rubroHelper';
import { PopUpManager } from '../../../managers/popUpManager';
import { TranslateService } from '@ngx-translate/core';
import { FormManager } from '../../../managers/formManager';



@Component({
  selector: 'rubros',
  templateUrl: './rubros.component.html',
  styleUrls: ['./rubros.component.scss']
})
export class RubrosComponent implements OnInit {
  rubroSeleccionado: any;
  info_rubro: Rubro;
  insertarRubro = false;
  clean = false;
  formInfoRubro: any;
  @Output() eventChange = new EventEmitter();
  constructor(
    private translate: TranslateService,
    private rbHelper: RubroHelper,
    private popManager: PopUpManager,
  ) {
    this.formInfoRubro = FORM_INFO_RUBRO;
    this.construirForm();
    this.rubroSeleccionado = {
    };
  }

  ngOnInit() {
    this.info_rubro = {} as Rubro;
  }



  construirForm() {
    this.formInfoRubro.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formInfoRubro.campos.length; i++) {
      this.formInfoRubro.campos[i].label = this.formInfoRubro.campos[i].label_i18n;
      this.formInfoRubro.campos[i].placeholder = this.formInfoRubro.campos[i].label_i18n;
    }
  }

  receiveMessage($event) {
    this.rubroSeleccionado = <Rubro>$event
    this.rubroSeleccionado.Id = parseInt(this.rubroSeleccionado.Id, 0);
    this.rubroSeleccionado.UnidadEjecutora = parseInt(this.rubroSeleccionado.UnidadEjecutora, 0);

    const data = {
      RubroPadre: this.rubroSeleccionado.Codigo,
    }

    this.info_rubro = <Rubro>data;
    this.formInfoRubro.campos[FormManager.getIndexForm(this.formInfoRubro, 'Codigo')].prefix.value = this.rubroSeleccionado.Codigo + '-';

  }

  aniadirNodo() {
    this.insertarRubro = !this.insertarRubro;
    const data = {
      RubroPadre: this.rubroSeleccionado.Codigo || '',
    }
    this.info_rubro = <Rubro>data;
  }

  cleanForm() {
    this.clean = !this.clean;
    this.rubroSeleccionado = {};
    this.info_rubro = null;
    this.formInfoRubro.campos[FormManager.getIndexForm(this.formInfoRubro, 'Codigo')].prefix.value = '';

  }



  validarForm(event) {
    if (event.valid) {
      event.data.RubroPadre = typeof this.rubroSeleccionado.Codigo === 'undefined' ? undefined : this.rubroSeleccionado;

      event.data.RubroHijo.Codigo = typeof this.rubroSeleccionado.Codigo === 'undefined' ?
        event.data.RubroHijo.Codigo + '' :
        this.rubroSeleccionado.Codigo + '-' + event.data.RubroHijo.Codigo;

      this.rbHelper.rubroRegister(event.data).subscribe((res) => {
        if (res) {
          this.popManager.showSuccessAlert('Se registro el Rubro correctamente!');
          this.cleanForm()
          this.eventChange.emit(true);
        }
      });
    } else {
      this.popManager.showErrorAlert('Datos Incompletos');
    }
  }

  deleteRubro() {
    const id = this.rubroSeleccionado.Id;
    this.rbHelper.rubroDelete(id).subscribe((res) => {
      if (res) {
        this.popManager.showSuccessAlert('Se Eliminó el Rubro correctamente!');
        this.cleanForm()
        this.eventChange.emit(true);
      }
    });
  }
};

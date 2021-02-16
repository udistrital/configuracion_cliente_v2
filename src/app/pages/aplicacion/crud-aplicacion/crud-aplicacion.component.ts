
import { Aplicacion } from './../../../@core/data/models/aplicacion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfiguracionService } from '../../../@core/data/configuracion.service';
import { FORM_APLICACION } from './form-aplicacion';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'ngx-crud-aplicacion',
  templateUrl: './crud-aplicacion.component.html',
  styleUrls: ['./crud-aplicacion.component.scss'],
})
export class CrudAplicacionComponent implements OnInit {
  aplicacion_id: number;

  @Input('aplicacion_id')
  set name(aplicacion_id: number) {
    this.aplicacion_id = aplicacion_id;
    this.loadAplicacion();
  }


  @Output() eventChange = new EventEmitter();
  @Output('returnEvent') returnEvent = new EventEmitter();

  info_aplicacion: Aplicacion;
  formAplicacion: any;
  regAplicacion: any;
  clean: boolean;
  return = true;

  constructor(private translate: TranslateService, private configuracionService: ConfiguracionService) {
    this.formAplicacion = FORM_APLICACION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.return = true;
  }

  construirForm() {
    this.formAplicacion.titulo = this.translate.instant('GLOBAL.aplicacion');
    this.formAplicacion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formAplicacion.campos.length; i++) {
      this.formAplicacion.campos[i].label = this.translate.instant('GLOBAL.' + this.formAplicacion.campos[i].label_i18n);
      this.formAplicacion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formAplicacion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }


  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formAplicacion.campos.length; index++) {
      const element = this.formAplicacion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }


  public loadAplicacion(): void {
    if (this.aplicacion_id !== undefined && this.aplicacion_id !== 0) {
      this.configuracionService.get('aplicacion/?query=id:' + this.aplicacion_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_aplicacion = <Aplicacion>res[0];
          }
        });
    } else {
      this.info_aplicacion = undefined;
      this.clean = !this.clean;
    }
  }

  updateAplicacion(aplicacion: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update Aplicacion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal.fire(opt)
      .then((willDelete) => {
        if (willDelete.value) {
          this.info_aplicacion = <Aplicacion>aplicacion;
          this.configuracionService.put('aplicacion', this.info_aplicacion)
            .subscribe(res => {
              this.loadAplicacion();
              this.eventChange.emit(true);
            });
        }
      });
  }

  createAplicacion(aplicacion: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create Aplicacion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal.fire(opt)
      .then((willDelete) => {
        if (willDelete.value) {
          this.info_aplicacion = <Aplicacion>aplicacion;
          this.configuracionService.post('aplicacion', this.info_aplicacion)
            .subscribe(res => {
              this.info_aplicacion = <Aplicacion><unknown>res;
              this.eventChange.emit(true);
            });
        }
      });
  }

  ngOnInit() {
    this.loadAplicacion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_aplicacion === undefined) {
        this.createAplicacion(event.data.Aplicacion);
      } else {
        this.updateAplicacion(event.data.Aplicacion);
      }
    }
  }


  backwards(event) {
    console.log(event);
    this.returnEvent.emit(event);
  }

}

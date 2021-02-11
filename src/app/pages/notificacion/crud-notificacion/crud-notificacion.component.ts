import { NotificacionConfiguracion } from './../../../@core/data/models/notificacion_configuracion';

import { Notificacion } from './../../../@core/data/models/notificacion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfiguracionService } from '../../../@core/data/configuracion.service';
import { FORM_NOTIFICACION } from './form-notificacion';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'ngx-crud-notificacion',
  templateUrl: './crud-notificacion.component.html',
  styleUrls: ['./crud-notificacion.component.scss'],
})
export class CrudNotificacionComponent implements OnInit {
  
  notificacion_id: number;

  @Input('notificacion_id')
  set name(notificacion_id: number) {
    this.notificacion_id = notificacion_id;
    this.loadNotificacion();
  }

  @Output() eventChange = new EventEmitter();

  info_notificacion: Notificacion;
  formNotificacion: any;
  regNotificacion: any;
  clean: boolean;

  constructor(private translate: TranslateService, private configuracionService: ConfiguracionService) {
    this.formNotificacion = FORM_NOTIFICACION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsNotificacionConfiguracion();
   }

  construirForm() {
    this.formNotificacion.titulo = this.translate.instant('GLOBAL.notificacion');
    this.formNotificacion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formNotificacion.campos.length; i++) {
      this.formNotificacion.campos[i].label = this.translate.instant('GLOBAL.' + this.formNotificacion.campos[i].label_i18n);
      this.formNotificacion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formNotificacion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsNotificacionConfiguracion(): void {
    let notificacionConfiguracion: Array<any> = [];
      this.configuracionService.get('notificacion_configuracion/?limit=0')
        .subscribe(res => {
          if (res !== null) {
            notificacionConfiguracion = <Array<NotificacionConfiguracion>>res;
          }
          this.formNotificacion.campos[ this.getIndexForm('NotificacionConfiguracion') ].opciones = notificacionConfiguracion;
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formNotificacion.campos.length; index++) {
      const element = this.formNotificacion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }


  public loadNotificacion(): void {
    if (this.notificacion_id !== undefined && this.notificacion_id !== 0) {
      this.configuracionService.get('notificacion/?query=id:' + this.notificacion_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_notificacion = <Notificacion>res[0];
          }
        });
    } else  {
      this.info_notificacion = undefined;
      this.clean = !this.clean;
    }
  }

  updateNotificacion(notificacion: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update Notificacion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal.fire(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_notificacion = <Notificacion>notificacion;
        this.configuracionService.put('notificacion', this.info_notificacion)
          .subscribe(res => {
            this.loadNotificacion();
            this.eventChange.emit(true);
            this.showToast('info', 'updated', 'Notificacion updated');
          });
      }
    });
  }

  createNotificacion(notificacion: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create Notificacion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal.fire(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_notificacion = <Notificacion>notificacion;
        this.configuracionService.post('notificacion', this.info_notificacion)
          .subscribe(res => {
            this.info_notificacion = <Notificacion><unknown>res;
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'Notificacion created');
          });
      }
    });
  }

  ngOnInit() {
    this.loadNotificacion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_notificacion === undefined) {
        this.createNotificacion(event.data.Notificacion);
      } else {
        this.updateNotificacion(event.data.Notificacion);
      }
    }
  }

  private showToast(type: string, title: string, body: string) {
console.log(type,body)
  }

}

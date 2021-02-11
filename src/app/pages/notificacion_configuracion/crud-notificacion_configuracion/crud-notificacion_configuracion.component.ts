import { MetodoHttp } from './../../../@core/data/models/metodo_http';
import { NotificacionTipo } from './../../../@core/data/models/notificacion_tipo';
import { Aplicacion } from './../../../@core/data/models/aplicacion';

import { NotificacionConfiguracion } from './../../../@core/data/models/notificacion_configuracion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfiguracionService } from '../../../@core/data/configuracion.service';
import { FORM_NOTIFICACION_CONFIGURACION } from './form-notificacion_configuracion';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'ngx-crud-notificacion-configuracion',
  templateUrl: './crud-notificacion_configuracion.component.html',
  styleUrls: ['./crud-notificacion_configuracion.component.scss'],
})
export class CrudNotificacionConfiguracionComponent implements OnInit {
  
  notificacion_configuracion_id: number;

  @Input('notificacion_configuracion_id')
  set name(notificacion_configuracion_id: number) {
    this.notificacion_configuracion_id = notificacion_configuracion_id;
    this.loadNotificacionConfiguracion();
  }

  @Output() eventChange = new EventEmitter();

  info_notificacion_configuracion: NotificacionConfiguracion;
  formNotificacionConfiguracion: any;
  regNotificacionConfiguracion: any;
  clean: boolean;

  constructor(private translate: TranslateService, private configuracionService: ConfiguracionService) {
    this.formNotificacionConfiguracion = FORM_NOTIFICACION_CONFIGURACION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsMetodoHttp();
    this.loadOptionsTipo();
    this.loadOptionsAplicacion();
  }

  construirForm() {
    this.formNotificacionConfiguracion.titulo = this.translate.instant('GLOBAL.notificacion_configuracion');
    this.formNotificacionConfiguracion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formNotificacionConfiguracion.campos.length; i++) {
      this.formNotificacionConfiguracion.campos[i].label = this.translate.instant('GLOBAL.' + this.formNotificacionConfiguracion.campos[i].label_i18n);
      this.formNotificacionConfiguracion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' +
        this.formNotificacionConfiguracion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsMetodoHttp(): void {
    let metodoHttp: Array<any> = [];
    this.configuracionService.get('metodo_http/?limit=0')
      .subscribe(res => {
        if (res !== null) {
          metodoHttp = <Array<MetodoHttp>>res;
        }
        this.formNotificacionConfiguracion.campos[this.getIndexForm('MetodoHttp')].opciones = metodoHttp;
      });
  }
  loadOptionsTipo(): void {
    let tipo: Array<any> = [];
    this.configuracionService.get('notificacion_tipo/?limit=0')
      .subscribe(res => {
        if (res !== null) {
          tipo = <Array<NotificacionTipo>>res;
        }
        this.formNotificacionConfiguracion.campos[this.getIndexForm('Tipo')].opciones = tipo;
      });
  }
  loadOptionsAplicacion(): void {
    let aplicacion: Array<any> = [];
    this.configuracionService.get('aplicacion/?limit=0')
      .subscribe(res => {
        if (res !== null) {
          aplicacion = <Array<Aplicacion>>res;
        }
        this.formNotificacionConfiguracion.campos[this.getIndexForm('Aplicacion')].opciones = aplicacion;
      });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formNotificacionConfiguracion.campos.length; index++) {
      const element = this.formNotificacionConfiguracion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }


  public loadNotificacionConfiguracion(): void {
    if (this.notificacion_configuracion_id !== undefined && this.notificacion_configuracion_id !== 0) {
      this.configuracionService.get('notificacion_configuracion/?query=id:' + this.notificacion_configuracion_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_notificacion_configuracion = <NotificacionConfiguracion>res[0];
          }
        });
    } else {
      this.info_notificacion_configuracion = undefined;
      this.clean = !this.clean;
    }
  }

  updateNotificacionConfiguracion(notificacionConfiguracion: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update NotificacionConfiguracion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal.fire(opt)
      .then((willDelete) => {
        if (willDelete.value) {
          this.info_notificacion_configuracion = <NotificacionConfiguracion>notificacionConfiguracion;
          this.configuracionService.put('notificacion_configuracion', this.info_notificacion_configuracion)
            .subscribe(res => {
              this.loadNotificacionConfiguracion();
              this.eventChange.emit(true);
              this.showToast('info', 'updated', 'NotificacionConfiguracion updated');
            });
        }
      });
  }

  createNotificacionConfiguracion(notificacionConfiguracion: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create NotificacionConfiguracion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal.fire(opt)
      .then((willDelete) => {
        if (willDelete.value) {
          this.info_notificacion_configuracion = <NotificacionConfiguracion>notificacionConfiguracion;
          this.configuracionService.post('notificacion_configuracion', this.info_notificacion_configuracion)
            .subscribe(res => {
              this.info_notificacion_configuracion = <NotificacionConfiguracion><unknown>res;
              this.eventChange.emit(true);
              this.showToast('info', 'created', 'NotificacionConfiguracion created');
            });
        }
      });
  }

  ngOnInit() {
    this.loadNotificacionConfiguracion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_notificacion_configuracion === undefined) {
        this.createNotificacionConfiguracion(event.data.NotificacionConfiguracion);
      } else {
        this.updateNotificacionConfiguracion(event.data.NotificacionConfiguracion);
      }
    }
  }

  private showToast(type: string, title: string, body: string) {
console.log(type,body)
  }

}

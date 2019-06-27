import { MenuOpcion } from './../../../@core/data/models/menu_opcion';

import { PerfilXMenuOpcion } from './../../../@core/data/models/perfil_x_menu_opcion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfiguracionService } from '../../../@core/data/configuracion.service';
import { FORM_PERFIL_X_MENU_OPCION } from './form-perfil_x_menu_opcion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-crud-perfil-x-menu-opcion',
  templateUrl: './crud-perfil_x_menu_opcion.component.html',
  styleUrls: ['./crud-perfil_x_menu_opcion.component.scss'],
})
export class CrudPerfilXMenuOpcionComponent implements OnInit {
  config: ToasterConfig;
  perfil_x_menu_opcion_id: number;

  @Input('perfil_x_menu_opcion_id')
  set name(perfil_x_menu_opcion_id: number) {
    this.perfil_x_menu_opcion_id = perfil_x_menu_opcion_id;
    this.loadPerfilXMenuOpcion();
  }

  @Output() eventChange = new EventEmitter();

  info_perfil_x_menu_opcion: PerfilXMenuOpcion;
  formPerfilXMenuOpcion: any;
  regPerfilXMenuOpcion: any;
  clean: boolean;

  constructor(private translate: TranslateService, private configuracionService: ConfiguracionService, private toasterService: ToasterService) {
    this.formPerfilXMenuOpcion = FORM_PERFIL_X_MENU_OPCION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsOpcion();
   }

  construirForm() {
    this.formPerfilXMenuOpcion.titulo = this.translate.instant('GLOBAL.perfil_x_menu_opcion');
    this.formPerfilXMenuOpcion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formPerfilXMenuOpcion.campos.length; i++) {
      this.formPerfilXMenuOpcion.campos[i].label = this.translate.instant('GLOBAL.' + this.formPerfilXMenuOpcion.campos[i].label_i18n);
      this.formPerfilXMenuOpcion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formPerfilXMenuOpcion.campos[i].label_i18n);
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsOpcion(): void {
    let opcion: Array<any> = [];
      this.configuracionService.get('menu_opcion/?limit=0')
        .subscribe(res => {
          if (res !== null) {
            opcion = <Array<MenuOpcion>>res;
          }
          this.formPerfilXMenuOpcion.campos[ this.getIndexForm('Opcion') ].opciones = opcion;
        });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formPerfilXMenuOpcion.campos.length; index++) {
      const element = this.formPerfilXMenuOpcion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }


  public loadPerfilXMenuOpcion(): void {
    if (this.perfil_x_menu_opcion_id !== undefined && this.perfil_x_menu_opcion_id !== 0) {
      this.configuracionService.get('perfil_x_menu_opcion/?query=id:' + this.perfil_x_menu_opcion_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_perfil_x_menu_opcion = <PerfilXMenuOpcion>res[0];
          }
        });
    } else  {
      this.info_perfil_x_menu_opcion = undefined;
      this.clean = !this.clean;
    }
  }

  updatePerfilXMenuOpcion(perfilXMenuOpcion: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update PerfilXMenuOpcion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_perfil_x_menu_opcion = <PerfilXMenuOpcion>perfilXMenuOpcion;
        this.configuracionService.put('perfil_x_menu_opcion', this.info_perfil_x_menu_opcion)
          .subscribe(res => {
            this.loadPerfilXMenuOpcion();
            this.eventChange.emit(true);
            this.showToast('info', 'updated', 'PerfilXMenuOpcion updated');
          });
      }
    });
  }

  createPerfilXMenuOpcion(perfilXMenuOpcion: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create PerfilXMenuOpcion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_perfil_x_menu_opcion = <PerfilXMenuOpcion>perfilXMenuOpcion;
        this.configuracionService.post('perfil_x_menu_opcion', this.info_perfil_x_menu_opcion)
          .subscribe(res => {
            this.info_perfil_x_menu_opcion = <PerfilXMenuOpcion>res;
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'PerfilXMenuOpcion created');
          });
      }
    });
  }

  ngOnInit() {
    this.loadPerfilXMenuOpcion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_perfil_x_menu_opcion === undefined) {
        this.createPerfilXMenuOpcion(event.data.PerfilXMenuOpcion);
      } else {
        this.updatePerfilXMenuOpcion(event.data.PerfilXMenuOpcion);
      }
    }
  }

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      // 'toast-top-full-width', 'toast-bottom-full-width', 'toast-top-left', 'toast-top-center'
      positionClass: 'toast-top-center',
      timeout: 5000,  // ms
      newestOnTop: true,
      tapToDismiss: false, // hide on click
      preventDuplicates: true,
      animation: 'slideDown', // 'fade', 'flyLeft', 'flyRight', 'slideDown', 'slideUp'
      limit: 5,
    });
    const toast: Toast = {
      type: type, // 'default', 'info', 'success', 'warning', 'error'
      title: title,
      body: body,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

}

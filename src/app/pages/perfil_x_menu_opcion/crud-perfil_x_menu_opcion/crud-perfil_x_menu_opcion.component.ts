
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ConfiguracionService } from '../../../@core/data/configuracion.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { Perfil } from '../../../@core/data/models/perfil';
import { TreeComponent, TreeModel, TreeNode, ITreeOptions } from 'angular-tree-component';
import { UtilidadesService } from '../../../@core/utils/utilidades.service';


@Component({
  selector: 'ngx-crud-perfil-x-menu-opcion',
  templateUrl: './crud-perfil_x_menu_opcion.component.html',
  styleUrls: ['./crud-perfil_x_menu_opcion.component.scss'],
})
export class CrudPerfilXMenuOpcionComponent implements OnInit {
  config: ToasterConfig;
  perfil_id: number;

  //tree rol
  treeModelRol: TreeModel;
  nodesRol = [];
  treeRol: any = {};
  @ViewChild('treeRol') treeComponentRol: TreeComponent;
  optionsRol: ITreeOptions = {
    useCheckbox: true,
    scrollContainer: <HTMLElement>document.body.parentElement
  };

  //tree menu
  treeModelMenu: TreeModel;
  nodesMenu = [];
  treeMenu: any = {};
  @ViewChild('treeMenu') treeComponentMenu: TreeComponent;
  optionsMenu: ITreeOptions = {
    useCheckbox: true,
    scrollContainer: <HTMLElement>document.body.parentElement
  };

  @Input('perfil_id')
  set name(perfil_id: number) {
    this.perfil_id = perfil_id;
    this.loadPerfil();
  }

  @Output() eventChange = new EventEmitter();

  info_perfil: Perfil;
  formPerfil: any;
  regPerfil: any;
  clean: boolean;

  constructor(private translate: TranslateService, private configuracionService: ConfiguracionService, private toasterService: ToasterService,
     private utils: UtilidadesService) {
   }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadTreeMenu() {
    // console.info(this.app);
    this.configuracionService.get(`perfil_x_menu_opcion/MenusPorAplicacion/${this.info_perfil.Aplicacion.Id}`)
      .subscribe(res => {
        if (res !== null) {
          this.nodesMenu = this.utils.translateTree(res);
          this.treeModelMenu = this.treeComponentMenu.treeModel;
          console.info(this.treeModelMenu);
          // if (this.info_menu_opcion) {
          //   if (this.info_menu_opcion.hasOwnProperty('Id')) {
          //     this.treeModel.getNodeById(this.info_menu_opcion.Id).setActiveAndVisible();
          //   }
          // }
        }
      });
  }


  loadTreeRol() {
    // console.info(this.app);
    this.configuracionService.get(`menu_opcion_padre/ArbolMenus/${this.info_perfil.Nombre}/${this.info_perfil.Aplicacion.Nombre}`)
      .subscribe(res => {
        if (res !== null) {
          this.nodesRol = this.utils.translateTree(res);
          this.treeModelRol = this.treeComponentRol.treeModel;
          console.info(this.treeModelRol);
          // if (this.info_menu_opcion) {
          //   if (this.info_menu_opcion.hasOwnProperty('Id')) {
          //     this.treeModel.getNodeById(this.info_menu_opcion.Id).setActiveAndVisible();
          //   }
          // }
        }
      });
  }


  public loadPerfil(): void {
    if (this.perfil_id !== undefined && this.perfil_id !== 0) {
      this.configuracionService.get('perfil/?query=id:' + this.perfil_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_perfil = <Perfil>res[0];
            this.loadTreeRol();
            this.loadTreeMenu();
          }
        });
    } else  {
      this.info_perfil = undefined;
      this.clean = !this.clean;
    }
  }

  updatePerfil(perfil: any): void {
    const opt: any = {
      title: 'Update?',
      text: 'Update Perfil!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_perfil = <Perfil>perfil;
        this.configuracionService.put('perfil', this.info_perfil)
          .subscribe(res => {
            this.loadPerfil();
            this.eventChange.emit(true);
            this.showToast('info', 'updated', 'Perfil updated');
          });
      }
    });
  }

  ngOnInit() {
    this.loadPerfil();
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

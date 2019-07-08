import { Aplicacion } from './../../../@core/data/models/aplicacion';

import { MenuOpcion, OpcionTipoOpcion } from './../../../@core/data/models/menu_opcion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfiguracionService } from '../../../@core/data/configuracion.service';
import { FORM_MENU_OPCION } from './form-menu_opcion';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NbSortDirection, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbSortRequest } from '@nebular/theme';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
import { Observable } from 'rxjs';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface EstructuraMenus {
  Id: number;
  Nombre: string;
}

@Component({
  selector: 'ngx-crud-menu-opcion',
  templateUrl: './crud-menu_opcion.component.html',
  styleUrls: ['./crud-menu_opcion.component.scss'],
})
export class CrudMenuOpcionComponent implements OnInit {
  config: ToasterConfig;
  menu_opcion_id: number;
  opciones_tipo_opcion: OpcionTipoOpcion[] = [
    { Id: 1, Nombre: 'Menú' },
    { Id: 2, Nombre: 'Botón' },
    { Id: 3, Nombre: 'Acción' },
  ];
  @Input('menu_opcion_id')
  set name(menu_opcion_id: number) {
    this.menu_opcion_id = menu_opcion_id;
    this.loadMenuOpcion();
  }

  tree: any = {};
  app: any;

  @Output() rubroSeleccionado = new EventEmitter();
  @Input() updateSignal: Observable<string[]>;
  update: any;
  customColumn = 'Codigo';
  defaultColumns = ['Nombre'];
  allColumns = [this.customColumn, ...this.defaultColumns];
  dataSource: NbTreeGridDataSource<EstructuraMenus>;

  sortColumn: string;
sortDirection: NbSortDirection = NbSortDirection.NONE;

  @Output() eventChange = new EventEmitter();

  info_menu_opcion: MenuOpcion;
  formMenuOpcion: any;
  regMenuOpcion: any;
  clean: boolean;



  constructor(
    private translate: TranslateService,
    private configuracionService: ConfiguracionService,
    private toasterService: ToasterService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<EstructuraMenus>) {
    this.formMenuOpcion = FORM_MENU_OPCION;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
    this.loadOptionsAplicacion();
    this.formMenuOpcion.campos[this.getIndexForm('TipoOpcion')].opciones = this.opciones_tipo_opcion;

  }

  selectAplicacion(app: any) {
    this.app = app.valor;
    this.loadTree();
  }


  loadTree(){
    this.configuracionService.get(`perfil_x_menu_opcion/MenusPorAplicacion/${this.app.valor.Id}`)
      .subscribe(res => {
        if (res !== null) {
          this.tree = <any>res;
          this.dataSource = this.dataSourceBuilder.create(this.tree);
        }
      });
  }

  construirForm() {
    this.formMenuOpcion.titulo = this.translate.instant('GLOBAL.menu_opcion');
    this.formMenuOpcion.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formMenuOpcion.campos.length; i++) {
      this.formMenuOpcion.campos[i].label = this.translate.instant('GLOBAL.' + this.formMenuOpcion.campos[i].label_i18n);
      this.formMenuOpcion.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formMenuOpcion.campos[i].label_i18n);
    }
  }
  searchByName(name: string): OpcionTipoOpcion {
    return (this.opciones_tipo_opcion.filter((opcion) => (opcion.Nombre === name)))[0];
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadOptionsAplicacion(): void {
    let aplicacion: Array<any> = [];
    this.configuracionService.get('aplicacion/?limit=0')
      .subscribe(res => {
        if (res !== null) {
          aplicacion = <Array<Aplicacion>>res;
        }
        this.formMenuOpcion.campos[this.getIndexForm('Aplicacion')].opciones = aplicacion;
      });
  }

  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formMenuOpcion.campos.length; index++) {
      const element = this.formMenuOpcion.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }


  public loadMenuOpcion(): void {
    if (this.menu_opcion_id !== undefined && this.menu_opcion_id !== 0) {
      this.configuracionService.get('menu_opcion/?query=id:' + this.menu_opcion_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_menu_opcion = <MenuOpcion>res[0];
            this.info_menu_opcion.TipoOpcion = <OpcionTipoOpcion>this.searchByName(res[0].TipoOpcion);

          }
        });
    } else {
      this.info_menu_opcion = undefined;
      this.clean = !this.clean;
    }
  }

  updateMenuOpcion(menuOpcion: any): void {

    const opt: any = {
      title: 'Update?',
      text: 'Update MenuOpcion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
      .then((willDelete) => {
        if (willDelete.value) {
          menuOpcion.TipoOpcion = menuOpcion.TipoOpcion.Nombre;
          this.info_menu_opcion = <MenuOpcion>menuOpcion;
          this.configuracionService.put('menu_opcion', this.info_menu_opcion)
            .subscribe(res => {
              this.loadMenuOpcion();
              this.eventChange.emit(true);
              this.showToast('info', 'updated', 'MenuOpcion updated');
            });
        }
      });
  }

  createMenuOpcion(menuOpcion: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create MenuOpcion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
      .then((willDelete) => {
        if (willDelete.value) {
          menuOpcion.TipoOpcion = menuOpcion.TipoOpcion.Nombre;
          this.info_menu_opcion = <MenuOpcion>menuOpcion;
          this.configuracionService.post('menu_opcion', this.info_menu_opcion)
            .subscribe(res => {
              this.info_menu_opcion = <MenuOpcion>res;
              this.eventChange.emit(true);
              this.showToast('info', 'created', 'MenuOpcion created');
            });
        }
      });
  }

  ngOnInit() {
    this.loadMenuOpcion();
  }

  validarForm(event) {
    if (event.valid) {
      if (this.info_menu_opcion === undefined) {
        this.createMenuOpcion(event.data.MenuOpcion);
      } else {
        this.updateMenuOpcion(event.data.MenuOpcion);
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


  updateTreeSignal($event) {
    console.info('updated', $event)
    this.loadTree();
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  async onSelect(selectedItem: any) {
    this.rubroSeleccionado.emit(selectedItem.data);
  }
  private data: TreeNode<EstructuraMenus>[];


  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
}


@Component({
  selector: 'nb-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
    </ng-template>
  `,
})

export class FsIconAComponent {
  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }

}
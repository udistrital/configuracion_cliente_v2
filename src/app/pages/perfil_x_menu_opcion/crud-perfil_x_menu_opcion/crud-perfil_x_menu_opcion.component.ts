
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ConfiguracionService } from '../../../@core/data/configuracion.service';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

import { Perfil } from '../../../@core/data/models/perfil';
import { TreeComponent, TreeModel, TreeNode, ITreeOptions } from '@circlon/angular-tree-component';
import { UtilidadesService } from '../../../@core/utils/utilidades.service';
import { from } from 'rxjs';


@Component({
  selector: 'ngx-crud-perfil-x-menu-opcion',
  templateUrl: './crud-perfil_x_menu_opcion.component.html',
  styleUrls: ['./crud-perfil_x_menu_opcion.component.scss'],
})
export class CrudPerfilXMenuOpcionComponent implements OnInit {

  @ViewChild('treeComponentRol') treeComponentRol: TreeComponent;
  @ViewChild('treeMenu') treeComponentMenu: TreeComponent;

  @Output() eventChange = new EventEmitter();
  perfil_id: number;

  // tree rol
  treeModelRol: TreeModel;
  treeNodeRol: TreeNode;
  nodesRol = [];
  treeRol: any = {};
  optionsRol: ITreeOptions = {
    useCheckbox: true,
    animateExpand: true,
    idField: 'Id',
    displayField: 'Nombre',
    childrenField: 'Opciones',
  };

  // tree menu
  treeModelMenu: TreeModel;
  treeNodeMenu: TreeNode;
  nodesMenu = [];
  treeMenu: any = {};
  optionsMenu: ITreeOptions = {
    useCheckbox: true,
    animateExpand: true,
    idField: 'Id',
    displayField: 'Nombre',
    childrenField: 'Opciones',
  };
  perfil_x_menu: any = [];

  @Input('perfil_id') set name(perfil_id: number) {
    this.perfil_id = perfil_id;
    this.loadPerfil();
  }


  info_perfil: any = {
    Nombre: '',
    Aplicacion: {
      Nombre: '',
    },
  };
  formPerfil: any;
  regPerfil: any;
  clean: boolean;

  constructor(private translate: TranslateService, private configuracionService: ConfiguracionService,
    private utils: UtilidadesService) {
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadTreeMenu() {
    this.configuracionService.get(`perfil_x_menu_opcion/MenusPorAplicacion/${this.info_perfil.Aplicacion.Id}`)
      .subscribe((res: any) => {
        if (res !== null) {
          this.nodesMenu = res;
          this.treeModelMenu = this.treeComponentMenu.treeModel;
          this.treeModelMenu.update();
        }
      }, error => {
        this.nodesMenu = [];
      });
  }

  loadPerfil_x_menu_opcion() {
    this.configuracionService.get(`perfil_x_menu_opcion?query=Perfil.Aplicacion.Id:${this.info_perfil.Aplicacion.Id}&limit=-1`)
      .subscribe((res: any[]) => {
        if (res !== null) {
          this.perfil_x_menu = res;
        } else {
          this.perfil_x_menu = [];
        }
      });
  }

  opcionEnRol(data: any) {
    // console.info(data);
    // console.info(this.perfil_x_menu);
    return (this.perfil_x_menu.filter((p: any) => (p.Perfil.Id === this.info_perfil.Id && p.Opcion.Id === data.Id)));
  }


  loadTreeRol() {
    this.configuracionService.get(`menu_opcion_padre/ArbolMenus/${this.info_perfil.Nombre}/${this.info_perfil.Aplicacion.Nombre}`)
      .subscribe((res: any) => {
        if (res !== null) {
          this.nodesRol = res;
          this.treeModelRol = this.treeComponentRol.treeModel;
          this.treeModelRol.update();
          this.loadPerfil_x_menu_opcion();
        } else {
          this.treeModelRol.update();
        }
      }, error => {
        this.nodesRol = [];
      });
  }

  vincular() {
    from(this.treeModelMenu.getActiveNodes())
      .subscribe((nodo: TreeNode) => {
        const opcion_rol = this.opcionEnRol((nodo.data));
        if (opcion_rol.length === 0) {
          this.configuracionService.post('perfil_x_menu_opcion', {
            Perfil: this.info_perfil,
            Opcion: nodo.data,
          }).subscribe(() => (this.loadTreeRol()));
        }
      });
  }

  desvincular() {
    from(this.treeModelRol.getActiveNodes())
      .subscribe((nodo: TreeNode) => {
        const opcion_rol = this.opcionEnRol((nodo.data))[0];
        if (opcion_rol) {
          this.configuracionService.delete('perfil_x_menu_opcion', opcion_rol).subscribe((data) => {
            this.loadTreeRol();
          });
        }
      });
  }

  public loadPerfil(): void {
    if (this.perfil_id !== undefined && this.perfil_id !== 0) {
      this.configuracionService.get('perfil/?query=id:' + this.perfil_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_perfil = res[0] as Perfil;
            this.loadTreeRol();
            this.loadTreeMenu();
          }
        });
    } else {
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
    Swal.fire(opt)
      .then((willDelete) => {
        if (willDelete.value) {
          this.info_perfil = perfil as Perfil;
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
    // console.log(type,body);
  }
}

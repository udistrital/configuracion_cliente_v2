import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ConfiguracionService } from '../../../@core/data/configuracion.service';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'ngx-list-notificacion-configuracion',
  templateUrl: './list-notificacion_configuracion.component.html',
  styleUrls: ['./list-notificacion_configuracion.component.scss'],
})
export class ListNotificacionConfiguracionComponent implements OnInit {
  uid: number;
  cambiotab: boolean = false;
  
  settings: any;

  source: LocalDataSource = new LocalDataSource();

  constructor(private translate: TranslateService, private configuracionService: ConfiguracionService) {
    this.loadData();
    this.cargarCampos();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.cargarCampos();
    });
  }

  cargarCampos() {
    this.settings = {
      add: {
        addButtonContent: '<span class="material-icons md-30">add_circle</span>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      edit: {
        editButtonContent: '<span class="material-icons">edit</span>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<span class="material-icons">delete</span>',
        confirmDelete: true,
      },
      mode: 'external',
      columns: {
        EndPoint: {
          title: this.translate.instant('GLOBAL.end_point'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        MetodoHttp: {
          title: this.translate.instant('GLOBAL.metodo_http'),
          // type: 'metodo_http;',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
          filterFunction: (cell?: any, search?: string): boolean => {
            return (((cell.Nombre).toLowerCase()).indexOf(search.toLowerCase()) !== -1 || search === '')
          },
        },
        Tipo: {
          title: this.translate.instant('GLOBAL.tipo'),
          // type: 'notificacion_tipo;',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
          filterFunction: (cell?: any, search?: string): boolean => {
            return (((cell.Nombre).toLowerCase()).indexOf(search.toLowerCase()) !== -1 || search === '')
          },
        },
        CuerpoNotificacion: {
          title: this.translate.instant('GLOBAL.cuerpo_notificacion'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Aplicacion: {
          title: this.translate.instant('GLOBAL.aplicacion'),
          // type: 'aplicacion;',
          valuePrepareFunction: (value) => {
            return value.Nombre;
          },
          filterFunction: (cell?: any, search?: string): boolean => {
            return (((cell.Nombre).toLowerCase()).indexOf(search.toLowerCase()) !== -1 || search === '')
          },
        },
      },
    };
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  loadData(): void {
    this.configuracionService.get('notificacion_configuracion/?limit=0').subscribe(res => {
      if (res !== null) {
        const data = <Array<any>>res;
        this.source.load(data);
      }
    });
  }

  ngOnInit() {
  }

  onEdit(event): void {
    this.uid = event.data.Id;
    this.activetab();
  }

  onCreate(event): void {
    this.uid = 0;
    this.activetab();
  }

  onDelete(event): void {
    const opt: any = {
      title: 'Deleting?',
      text: 'Delete NotificacionConfiguracion!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal.fire(opt)
      .then((willDelete) => {

        if (willDelete.value) {
          this.configuracionService.delete('notificacion_configuracion/', event.data).subscribe(res => {
            if (res !== null) {
              this.loadData();
              this.showToast('info', 'deleted', 'NotificacionConfiguracion deleted');
            }
          });
        }
      });
  }

  activetab(): void {
    this.cambiotab = !this.cambiotab;
  }

  selectTab(event): void {
    if (event.label === this.translate.instant('GLOBAL.lista')) {
      this.cambiotab = false;
    } else {
      this.cambiotab = true;
    }
  }

  onChange(event) {
    if (event) {
      this.loadData();
      this.cambiotab = !this.cambiotab;
    }
  }


  itemselec(event): void {
    // console.log("afssaf");
  }

  private showToast(type: string, title: string, body: string) {
console.log(type,body)
  }

}

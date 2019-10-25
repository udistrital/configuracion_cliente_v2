import { Injectable } from '@angular/core';
import { ConfiguracionService } from './services/configuracion.service';
import { NotioasService } from './services/notioas.service';
import { catalogo } from './catalogo'
import { MenuAplicacionesService} from './services/menuAplicaciones.service';

@Injectable({
  providedIn: 'root',
})
export class UtilidadesCoreService {

  constructor(private confService: ConfiguracionService, private notioasService: NotioasService, private menuService: MenuAplicacionesService) {
  }
  initLib({ CONFIGURACION_SERVICE, NOTIFICACION_SERVICE, entorno, notificaciones, menuApps }) {
    this.confService.setPath(CONFIGURACION_SERVICE);

    if (notificaciones) {
      this.notioasService.init(NOTIFICACION_SERVICE);
    }
    if (menuApps) {
      this.menuService.init(catalogo[entorno]);
    }
  }
}

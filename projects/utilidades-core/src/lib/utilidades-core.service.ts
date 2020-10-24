import { Injectable } from '@angular/core';
import { ConfiguracionService } from './services/configuracion.service';
import { NotioasService } from './services/notioas.service';
import { catalogo } from './catalogo'
import { MenuAplicacionesService} from './services/menuAplicaciones.service';
import { ImplicitAutenticationService } from './services/implicit_autentication.service';

@Injectable({
  providedIn: 'root',
})
export class UtilidadesCoreService {

  constructor(private confService: ConfiguracionService, 
    private notioasService: NotioasService,
    private menuService: MenuAplicacionesService,
    private autenticacionService: ImplicitAutenticationService) {
  }
  initLib({ CONFIGURACION_SERVICE, NOTIFICACION_SERVICE, entorno, notificaciones, menuApps, autenticacion, TOKEN }) {
    this.confService.setPath(CONFIGURACION_SERVICE);

    if(autenticacion) {
      this.autenticacionService.init(TOKEN);
    }

    if (menuApps) {
      this.menuService.init(catalogo[entorno]);
    }
    
    this.autenticacionService.user$
    .subscribe((response: any) => {
      const accessToken = localStorage.getItem('access_token');
        if (accessToken !== null && typeof response.user !== 'undefined' ) {
          if (notificaciones) {
            this.notioasService.init(NOTIFICACION_SERVICE);
          }
        }
      });
    }
}

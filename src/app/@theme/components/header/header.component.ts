import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
// import { AutenticationService } from '../../../@core/utils/autentication.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ImplicitAutenticationService } from '../../../@core/utils/implicit_autentication.service';
import { NotioasService } from 'utilidades-core';
import { environment } from './../../../../environments/environment';

const { NOTIFICACION_SERVICE, CONFIGURACION_SERVICE } = environment;

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  @Input() position = 'normal';
  itemClick: Subscription;
  liveTokenValue: boolean = false;
  user: any;
  title: any;
  username = '';
  userMenu = [{ title: 'ver todas', icon: 'fa fa-list' }];
  public noNotify: any = '0';
  private autenticacion = new ImplicitAutenticationService;

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private analyticsService: AnalyticsService,
    private router: Router,
    public notificacionService: NotioasService,
    public translate: TranslateService) {
    this.translate = translate;
    this.itemClick = this.menuService.onItemClick()
      .subscribe((event) => {
        this.onContecxtItemSelection(event.item.title);
      });

    this.liveToken();
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  liveToken() {
    if (this.autenticacion.live()) {
      this.liveTokenValue = this.autenticacion.live();
      this.username = (this.autenticacion.getPayload()).sub;
      this.notificacionService.initLib(CONFIGURACION_SERVICE, NOTIFICACION_SERVICE)
    }
    return this.autenticacion.live();
  }

  onContecxtItemSelection(title) {
    if (title === 'ver todas') {
      this.router.navigate(['/pages/notificacion/listado']);
    }
  }


  logout() {
    this.autenticacion.logout();
    // this.liveTokenValue = auth.live(true);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(false, 'menu-sidebar');
    return false;
  }

  toggleNotifications() {
    this.notificacionService.toogleMenuNotify();
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
  abrirMenu(){
    var menu=document.getElementById('menu-app')
    if (!menu.className.includes("menu_is_active")){
        console.log("entro a funcion")
        menu.classList.add('menu_is_active')
    }else{
        menu.classList.remove('menu_is_active')
    }
  }
}

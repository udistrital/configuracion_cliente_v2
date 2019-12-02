import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
// import { AutenticationService } from '../../../@core/utils/autentication.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NotioasService, MenuAplicacionesService, UtilidadesCoreService  } from 'utilidades-core';
import { environment } from './../../../../environments/environment';


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
  

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private analyticsService: AnalyticsService,
    private router: Router,
    public notificacionService: NotioasService,
    private utilidadesService: UtilidadesCoreService,
    private menuAplicacionesService: MenuAplicacionesService,

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
    if (window.Auth.live()) {
      this.liveTokenValue = window.Auth.live();
      this.username = (window.Auth.getPayload()).sub;
      this.utilidadesService.initLib(environment);
      // this.initLib(CONFIGURACION_SERVICE, NOTIFICACION_SERVICE)
    }
    return window.Auth.live();
  }

  onContecxtItemSelection(title) {
    if (title === 'ver todas') {
      this.router.navigate(['/pages/notificacion/listado']);
    }
  }


  logout() {
    window.Auth.logout();
    // this.liveTokenValue = auth.live(true);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(false, 'menu-sidebar');
    return false;
  }

  toggleNotifications() {
    this.notificacionService.toogleMenuNotify();
  }

  abrirMenu() {
    this.menuAplicacionesService.toogleMenuNotify();
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

}

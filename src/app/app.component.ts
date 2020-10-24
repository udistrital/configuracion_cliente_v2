/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { TranslateService } from '@ngx-translate/core';
import { ImplicitAutenticationService, UtilidadesCoreService, MenuAplicacionesService } from 'utilidades-core';
import { environment } from './../environments/environment';
declare global {
  interface Window { Auth: any; }
}
@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(private analytics: AnalyticsService,
    private translateService: TranslateService,
    private utilidades: UtilidadesCoreService,
    private implicitAutentication: ImplicitAutenticationService,
    private menuService: MenuAplicacionesService
  ) {
    window.Auth = window.Auth || {};
    window.Auth = implicitAutentication;
    window.Auth.init(environment.TOKEN);
    this.utilidades.initLib(environment);
    const isButtonLogin = false;
    if (window.Auth.login(isButtonLogin)) {
      window.Auth.live();
    }
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.translateService.addLangs(['es', 'en']);
    this.translateService.setDefaultLang('es');
    this.translateService.use(this.translateService.getBrowserLang());
  }
}

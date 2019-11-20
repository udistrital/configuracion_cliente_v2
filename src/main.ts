/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { ImplicitAutenticationService } from 'utilidades-core';

if (environment.production) {
  enableProdMode();
}

declare global {
  interface Window { Auth: any; }
}

window.Auth = window.Auth || {};

window.Auth = new ImplicitAutenticationService;
window.Auth.init(environment.TOKEN);
const isButtonLogin = false;

if (window.Auth.login(isButtonLogin)) {
  window.Auth.live();
}

// autenticacion.clearUrl();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


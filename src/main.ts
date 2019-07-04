/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { GENERAL } from './app/app-config';

//import * as auth from 'oidc-auth/index.js';
import { ImplicitAutenticationService } from './app/@core/utils/implicit_autentication.service';


if (environment.production) {
  enableProdMode();
}
const autenticacion= new ImplicitAutenticationService;

// auth.setGeneral(GENERAL.ENTORNO.TOKEN);

 const isButtonLogin=false;
 if(!autenticacion.getAuthorizationUrl(isButtonLogin)){
//   if(isButtonLogin){
//     var button = document.createElement("button");
//     button.innerHTML = "LOGIN";
//     var body = document.getElementsByTagName("body")[0];
//     body.appendChild(button);
//     button.addEventListener ("click",()=>{
//       auth.getAuthorizationUrl()
//     });
//   }
 }else{
//         auth.liveToken();

         }

// auth.clearUrl();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

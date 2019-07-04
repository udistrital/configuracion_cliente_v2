/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as auth from 'oidc-auth/index.js';


if (environment.production) {
  enableProdMode();
}

auth.setGeneral(environment.TOKEN);

 const isButtonLogin=false;

 if(!auth.live(isButtonLogin)){
  if(isButtonLogin){
    var button = document.createElement("button");
    button.innerHTML = "LOGIN";
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(button);
    button.addEventListener ("click",()=>{
      auth.getAuthorizationUrl()
    });
  }
 }else{
        auth.liveToken();

         }

auth.clearUrl();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

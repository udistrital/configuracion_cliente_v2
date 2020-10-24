import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment'
import { RequestManager } from '../../managers/requestManager';

const path = environment.CONF_MENU_SERVICE;

@Injectable()
export class MenuService {

  constructor(private requestManager: RequestManager) {
    this.requestManager.setPath('CONFIGURACION_SERVICE');
  }

  get(endpoint) {
    return this.requestManager.get(endpoint);
  }

  post(endpoint, element) {
    return this.requestManager.post(endpoint, element);
  }

  put(endpoint, element) {
    return this.requestManager.put(endpoint, element);
  }

  delete(endpoint, element) {
    return this.requestManager.delete(endpoint, element.Id);
  }
}

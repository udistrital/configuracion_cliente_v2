import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Rubro } from './models/rubro';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

//const path_mid = LIGASUDAMERICANAMID;
const rubro: Rubro  = {
  Id : 1,
  Organizacion : 1,
  Codigo : "3-120-100",
  Descripcion : "Este es un rubro que deberia mostrarse",
  UnidadEjecutora: 1,
  Nombre : "Rubro Kronos",
  RubroPadre : ""
}

@Injectable({
  providedIn: 'root',
})
export class RubroService {

  
  constructor(private http: HttpClient) { 

  }

  get = function(endpoint) {
    return rubro;
    //return this.http.get(path_mid + endpoint);
  }

  post = function(endpoint, element) {
    //return this.http.post(path_mid + endpoint, element, httpOptions);
  }

  put = function(endpoint, element , ID) {
    //return this.http.put(path_mid + endpoint + '/' + ID, element, httpOptions);
  }

  delete = function(endpoint, element) {
    //return this.http.delete(path_mid + endpoint + '/' + element.Id, httpOptions);
  }

}
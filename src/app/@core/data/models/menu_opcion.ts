import { Aplicacion } from './aplicacion';

export class MenuOpcion {
  Id: number;
  Nombre: string;
  Descripcion: string;
  Url: string;
  Layout: string;
  Aplicacion: Array<Aplicacion>;
  TipoOpcion: string;
}

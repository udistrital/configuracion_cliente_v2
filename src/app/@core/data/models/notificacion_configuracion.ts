import { MetodoHttp } from './metodo_http';
import { NotificacionTipo } from './notificacion_tipo';
import { Aplicacion } from './aplicacion';

export class NotificacionConfiguracion {
  Id: number;
  EndPoint: string;
  MetodoHttp: Array<MetodoHttp>;
  Tipo: Array<NotificacionTipo>;
  CuerpoNotificacion: string;
  Aplicacion: Array<Aplicacion>;
}

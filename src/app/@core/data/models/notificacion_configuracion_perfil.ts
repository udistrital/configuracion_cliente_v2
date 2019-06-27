import { NotificacionConfiguracion } from './notificacion_configuracion';
import { Perfil } from './perfil';

export class NotificacionConfiguracionPerfil {
  Id: number;
  NotificacionConfiguracion: Array<NotificacionConfiguracion>;
  Perfil: Array<Perfil>;
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { ConfiguracionService } from './configuracion.service';
import { from, interval } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { map } from 'rxjs-compat/operators/map';

@Injectable({
    providedIn: 'root',
})
export class NotioasService {
    NOTIFICACION_SERVICE = '';
    public messagesSubject: Subject<any>;

    public listMessage: any;
    private notificacion_estado_usuario: any

    private noNotifySubject = new Subject();
    public noNotify$ = this.noNotifySubject.asObservable();

    private arrayMessagesSubject = new Subject();
    public arrayMessages$ = this.arrayMessagesSubject.asObservable();
    timerPing$ = interval(30000);
    roles: any;
    user: any;


    constructor(
        private confService: ConfiguracionService,
    ) {
        this.listMessage = [];
        this.notificacion_estado_usuario = []

    }

    initLib(pathConfiguracion: string, pathNotificacion: string) {
        this.confService.setPath(pathConfiguracion);
        this.NOTIFICACION_SERVICE = pathNotificacion;
        this.connect();
        this.queryNotification();
    }

    getNotificaciones() {
        this.noNotifySubject.next((this.listMessage.filter(data => (data.Estado).toLowerCase() === 'enviada')).length)
        this.arrayMessagesSubject.next(this.listMessage);
    }

    getNotificacionEstadoUsuario(id) {
        return (this.notificacion_estado_usuario.filter(data => data.Id === id))[0];
    }

    send_ping() {
        this.timerPing$.subscribe(() => (this.messagesSubject.next('ping')));
    }

    connect() {
        const id_token = localStorage.getItem('id_token');
        if (id_token !== null) {
            this.roles = (JSON.parse(atob(id_token.split('.')[1])).role).filter((data: any) => (data.indexOf('/') === -1));
            this.user = JSON.parse(atob(id_token.split('.')[1])).sub;
            const connWs = `${this.NOTIFICACION_SERVICE}/join?id=${this.user}&profiles=${this.roles}`;
            this.messagesSubject = webSocket(connWs);
            this.messagesSubject
                .pipe(
                    map((msn) => {
                        if (msn.Estado === 'conected') {
                            this.send_ping();
                        } else {
                            this.listMessage = [...[msn], ...this.listMessage];
                            this.noNotifySubject.next((this.listMessage.filter(data => (data.Estado).toLowerCase() === 'enviada')).length);
                            this.arrayMessagesSubject.next(this.listMessage);
                        }
                        return msn
                    }),
                )
                .subscribe(
                    (msg: any) => this.send_ping(),
                    err => {
                        console.info(err);
                        // this.connect();
                    },
                    () => console.info('complete'),
                );
        }

    }

    close() {
        this.messagesSubject.unsubscribe();
    }

    addMessage(message) {
        this.listMessage = [...[message], ...this.listMessage];
        this.noNotifySubject.next((this.listMessage.filter(data => (data.Estado).toLowerCase() === 'enviada')).length);
        this.arrayMessagesSubject.next(this.listMessage);
        console.info(this.listMessage)
    }

    changeStateNoView() {
        if (this.listMessage.filter(data => (data.Estado).toLowerCase() === 'enviada').length >= 1) {
            this.confService.post('notificacion_estado_usuario/changeStateNoView/' + this.user, {})
                .subscribe(res => {
                    this.listMessage = [];
                    this.queryNotification();
                });
        }
    }

    changeStateToView(id, estado) {
        if (estado === 'noleida') {
            const notificacion = this.getNotificacionEstadoUsuario(id);
            this.confService.get('notificacion_estado_usuario/changeStateToView/' + notificacion.Id)
                    .subscribe(res => {
                        this.listMessage = [];
                        this.queryNotification();
            });
        }
    }

    queryNotification() {
        this.confService.get('notificacion_estado_usuario?query=Usuario:' + this.user + ',Activo:true&sortby=id&order=asc&limit=-1')
            .subscribe((resp: any) => {
                if (resp !== null) {
                    this.notificacion_estado_usuario = resp
                    from(resp)
                        .subscribe((notify: any) => {
                            if (typeof notify.Notificacion !== 'undefined') {
                                const message = {
                                    Id: notify.Id,
                                    Type: notify.Notificacion.NotificacionConfiguracion.Tipo.Id,
                                    Content: JSON.parse(notify.Notificacion.CuerpoNotificacion),
                                    User: notify.Notificacion.NotificacionConfiguracion.Aplicacion.Nombre,
                                    Alias: notify.Notificacion.NotificacionConfiguracion.Aplicacion.Alias,
                                    EstiloIcono: notify.Notificacion.NotificacionConfiguracion.Aplicacion.EstiloIcono,
                                    FechaCreacion: new Date(notify.Notificacion.FechaCreacion),
                                    FechaEdicion: new Date(notify.Fecha),
                                    Estado: notify.NotificacionEstado.CodigoAbreviacion,
                                };
                                this.addMessage(message);
                            }
                        });
                }

            });

    }

}

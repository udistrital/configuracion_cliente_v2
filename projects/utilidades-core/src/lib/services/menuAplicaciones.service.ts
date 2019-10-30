import { Injectable } from '@angular/core';
import { ConfiguracionService } from './configuracion.service';
import {  BehaviorSubject, fromEvent } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class MenuAplicacionesService {
    private dataFilterSubject = new BehaviorSubject([]);
    public eventFilter$ = this.dataFilterSubject.asObservable();

    private activo = new BehaviorSubject({});
    public activo$ = this.activo.asObservable();

    categorias: any;
    isLogin = false;
    roles: any;
    public menuActivo: Boolean = false;

    constructor(private configuracionService: ConfiguracionService) {
        this.roles = this.getRole();
        const up$ = fromEvent(document, 'mouseup');

        up$.subscribe((data: any) => {
            if (this.activo) {
                if(((data.path.map((info: any)=>{return (info.localName)})).filter((data: any )=>(data === 'menu-aplicaciones'))).length === 0){
                    this.closePanel();
                }
            }
        });
    }
        
    closePanel() {
        this.menuActivo = false;
        this.activo.next({ activo: this.menuActivo });
    }

    getRole() {
        const data = [];
        if (window.localStorage.getItem('id_token') !== null) {
            this.isLogin = true;
            // tslint:disable-next-line: variable-name
            const id_token = window.localStorage.getItem('id_token').split('.');
            const payload = JSON.parse(atob(id_token[1]));
            return payload.role.map((element) => ({ Nombre: element }));
        } else {
            this.isLogin = false;
            this.dataFilterSubject.next(this.categorias);
        }
    }
    toogleMenuNotify() {
        this.menuActivo = !this.menuActivo;
        const data = { activo: this.menuActivo }
        this.activo.next(data);
    }

    init(categorias: any) {
        console.info('...Init lib menu');
        console.info(categorias);

        this.categorias = categorias;
        this.dataFilterSubject.next(this.categorias);
        this.getAplication();
    }

    public getAplication(): any {

        this.configuracionService.post('aplicacion_rol/aplicacion_rol', this.roles)
            .subscribe((data: any) => {
                let nuevasAplicaciones = this.categorias.map((categoria: any) => {
                    categoria.aplicaciones = categoria.aplicaciones.filter((aplicacion: any) => (this.existe(aplicacion.nombre, data)));
                    categoria.aplicaciones = categoria.aplicaciones.map((app: any) => {return {...app, ...{estilo_logo: app.estilo.split('-')[0]}}
                    
                });
                    return categoria;
                });
                nuevasAplicaciones = nuevasAplicaciones.filter((categoria) => (categoria.aplicaciones.length > 0));
                console.info(nuevasAplicaciones);
                this.dataFilterSubject.next(nuevasAplicaciones);
            });
        return this.eventFilter$;
    }

    existe(nombre: string, array: any) {
        const filtro = array.filter((data: any) => (nombre.toLowerCase() === data.Nombre.toLowerCase()));
        return filtro.length > 0;
    }

}

import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { NotioasService } from './notioas.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-notioas',
  template: `
    <div class="row">
    <div class="input-group">
      <input type="text" class="form-control" (keyup)="searchTerm$.next($event.target.value)" placeholder="Search ...">
      <span class="input-group-append">
      </span>
    </div>
    </div>
    <br>
      <div class="row">
        <ul>
          <li *ngFor="let notificacion of notificaciones"
          (click)="redirect(notificacion.Content.Message.Link,notificacion.Id)" [id]="notificacion.Estado">
              <img  class="menu-app" [id]="notificacion.EstiloIcono">
              <h3> {{notificacion.Alias}} </h3>
              <h4>
                {{notificacion.Content.Message.Message}}
              </h4>
              <h4>
                {{ notificacion.FechaCreacion }}
              </h4>
          </li>
        </ul>
      </div>
  `,
  styles: [
    `.menu-app{
    background: url('https://s3.amazonaws.com/assets-oas/logos-75.png');
    display: inline-block;
    height: 75px;
    width: 75px;
    margin-top: 3px;
    border-color: #34495e
  }`,

    `#noleida, #enviada, #ENVIADA{
    background-color: grey
  }`,

    `.mat-list-base .mat-list-item .mat-list-avatar{
    height: 75px;
    width: 75px;
  }`,

    `.mat-list-base .mat-list-item .mat-line{
      white-space: normal;
  }`,

    `.form-control{
     margin: 0px 34px;
  }`,

    `#polux{
    background-position: 0px 0px;
  }`,
    `#jano {
    background-position: -75px 0px;
  }`,
    `#kyron {
    background-position: -150px 0px;
  }`,
    `#sga {
    background-position: -225px 0px;
  }`,
    `#kronos {
    background-position: -301px 0px;
  }`,
    `#agora{
    background-position: 0px -75px;
  }`,
    `#argo{
    background-position: -75px -75px;
  }`,
    `#arka{
    background-position: -150px -75px;
  }`,
    `#temis{
    background-position: -225px -75px;
  }`],
})
export class NotioasComponent {
  searchTerm$ = new Subject<string>();

  notificaciones: any;
  constructor(private notificacionService: NotioasService,    private router: Router) {
    this.notificaciones = [];
    this.notificacionService.arrayMessages$
      .subscribe((notification: any) => {
        this.notificaciones = notification;
      });
    this.searchTerm$
      .pipe(
        debounceTime(700),
        distinctUntilChanged(),
        switchMap(query => this.searchEntries(query)),
      ).subscribe(response => {
        this.notificaciones = response;
      })
    this.notificacionService.getNotificaciones();

  }

  searchEntries(term) {
    const array = []
    array.push(this.notificacionService.listMessage.filter(notify => notify.Content.Message.indexOf(term) !== -1 || notify.User.indexOf(term) !== -1));
    return array
  }

  redirect(content: any, id: any) {
    this.router.navigate([content]);
    this.notificacionService.changeStateToView(id);
  }


}

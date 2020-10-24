import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NotioasService } from './../services/notioas.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-notioas',
  templateUrl: './notioas.component.html',
  styleUrls: ['./notioas.component.css'],
})
export class NotioasComponent implements OnInit {
  ngOnInit(): void {
    this.notificacionService.activo$
    .subscribe((isActive: any) => {
      const { activo } = isActive;
      this.activo = activo;
    });
  }
  searchTerm$ = new Subject<string>();

  notificaciones: any;
  activo: Boolean = false;
  constructor(public notificacionService: NotioasService, private router: Router) {
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
    array.push(this.notificacionService.listMessage.filter(
      (notify: any) => notify.Content.Message.Message.indexOf(term) !== -1 || notify.User.indexOf(term) !== -1));
    return array
  }

  redirect(noti) {
    this.notificacionService.changeStateToView(noti.Id, noti.Estado);
    console.info(noti);
    const path_sub = window.location.origin;
    if (noti.Content.Message.Link.indexOf(path_sub) === -1) {
      window.open(noti.Content.Message.Link, '_blank');
    } else {
      this.router.navigate([noti.Content.Message.Link.substring(noti.Content.Message.Link.indexOf('#') + 1)]);
    }
  }
}

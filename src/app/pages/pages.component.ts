import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppService } from './../app.service';
import { fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-loading></ngx-loading>
    <ng-uui-oas *ngIf="!loaded" [environment]="environment"></ng-uui-oas>
    <div *ngIf="loaded" class="main-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./pages.component.scss']

})

export class PagesComponent implements OnInit {
  environment: any;
  loaded: boolean = false;
  userData: any;
  loadingRouter: boolean = false;
  constructor(
    private scriptService: AppService,
    private router: Router,
    private translateService: TranslateService,
  ) {
    this.environment = environment;


    router.events.subscribe((event) => {
      if (event instanceof RouteConfigLoadStart) {
        Swal.fire({
          title: 'Cargando módulo ...',
          html: `Por favor espere`,
          showConfirmButton: false,
          allowOutsideClick: false,
          willOpen: () => {
            Swal.showLoading()
          },
        });
        this.loadingRouter = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loadingRouter = false;
        Swal.close();
      }
    })


    this.scriptService.loadScript('web-components')
      .then((scriptsLoaded) => {
        if (!this.loaded) {
          console.log(scriptsLoaded)
          //   const oas = document.querySelector('ng-uui-oas');
          //   fromEvent(oas, 'user')
          //     .pipe(pluck('detail'))
          //     .subscribe((data) => {
          //       console.log(data);
          //     })

          //   fromEvent(oas, 'option')
          //     .pipe(pluck('detail'))
          //     .subscribe((data: any) => {
          //       if (data) {
          //         setTimeout(() => { this.router.navigate([data.Url]) }, 300)
          //       }
          //     })
          //   this.loaded = true;
        }
      })
  }

  ngOnInit(): void {
    this.translateService.addLangs(['es', 'en']);
    this.translateService.setDefaultLang('es');
    this.translateService.use(this.translateService.getBrowserLang());
  }
}

// /deep/ router-outlet + * {
//   display: block;
//   animation: fade 1s;

//   @keyframes fade {
//     from {
//       opacity: 0;
//     }

//     to {
//       opacity: 1;
//     }
//   }
// }
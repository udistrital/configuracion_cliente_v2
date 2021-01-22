import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppService } from './../app.service';
import { fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-pages',
  template: `
    <ng-uui-oas [environment]="environment"></ng-uui-oas>
    <div *ngIf="loaded" class="main-container">
      <router-outlet></router-outlet>
    </div>
  `,
})

export class PagesComponent implements OnInit {
  title = 'configuracion-cliente';
  environment = environment;
  loaded: boolean = false;
  userData: any;
  constructor(
    private scriptService: AppService, 
    private router: Router,
    private translateService: TranslateService,
    ) {

    this.scriptService.loadScript('web-components')
      .then((scriptsLoaded) => {
        if (!this.loaded) {
          console.log(scriptsLoaded)
          const oas = document.querySelector('ng-uui-oas');
          fromEvent(oas, 'user')
            .pipe(pluck('detail'))
            .subscribe((data) => {
              console.log(data);
            })

          fromEvent(oas, 'option')
            .pipe(pluck('detail'))
            .subscribe((data: any) => {
              this.router.navigate([data.Url]);
              console.log(data);
            })
          this.loaded = true;
        }

      })
  }

  ngOnInit(): void {
    this.translateService.addLangs(['es', 'en']);
    this.translateService.setDefaultLang('es');
    this.translateService.use(this.translateService.getBrowserLang());
  }
}

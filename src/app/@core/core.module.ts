import { AuthInterceptor } from './_Interceptor/auth.Interceptor';
import {  NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of as observableOf } from 'rxjs';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { AuthGuard } from './_guards/auth.guard';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'socicon-github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'socicon-facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'socicon-twitter',
  },
];

@NgModule({
  imports: [
    CommonModule,

  ],
  exports: [
  ],
  declarations: [],
  providers: [
    AuthGuard,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  }

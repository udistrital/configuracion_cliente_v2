import { NgModule} from '@angular/core';
import { NotioasComponent } from './notioas.component';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ConfiguracionService } from './configuracion.service';
import { MomentModule } from 'ngx-moment';

// import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [NotioasComponent],
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
    MomentModule,
    // BrowserModule,
  ],
  providers: [ConfiguracionService],
  exports: [NotioasComponent],
})
export class NotioasModule { }

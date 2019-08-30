This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.

## Code scaffolding

Run `ng generate component component-name --project notioas` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project notioas`.
> Note: Don't forget to add `--project notioas` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build notioas` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build notioas`, go to the dist folder `cd dist/notioas` and run `npm publish`.

## Running unit tests

Run `ng test notioas` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Ejemplos
`header.component.ts`
```js
import { NotioasService } from 'notioas';
const { NOTIFICACION_SERVICE, CONFIGURACION_SERVICE } = environment;
export class HeaderComponent {
	...
	constructor(private sidebarService: NbSidebarService,
		...
		public notificacionService: NotioasService,
		...
		){
		...
		}
	liveToken() {
		if (this.autenticacion.live()) {
		  ...
		  this.notificacionService.initLib(CONFIGURACION_SERVICE, NOTIFICACION_SERVICE)
		}
		...
	}
	toggleNotifications(): boolean {
		this.sidebarService.toggle(false, 'notifications-sidebar');
		this.notificacionService.changeStateNoView();
		return false;
 	 }
  }
```
`header.component.html`
```html
<nb-action class="control-item" icon="nb-notifications" [badgeText]="notificacionService.noNotify$ | async"
    badgeStatus="danger" (click)="toggleNotifications()"></nb-action>
```
`theme.module.ts`
```js
import { NotioasModule } from 'notioas';
@NgModule({
  imports: [...[NotioasModule], ...BASE_MODULES, ...NB_MODULES, SharedModule, ...MAT_MODULES, MomentModule],
  exports: [...BASE_MODULES, ...NB_MODULES, ...COMPONENTS, ...PIPES, ...MAT_MODULES],
  declarations: [...COMPONENTS, ...PIPES, DinamicformComponent, SelectComponent],
  entryComponents: [...ENTRY_COMPONENTS],
})
```
`sample.layout.ts`
```js
@Component({
  selector: 'ngx-sample-layout',
  styleUrls: ['./sample.layout.scss'],
  template: `
    <nb-layout [center]="layout.id === 'center-column'" windowMode>
	  ...	
      <nb-sidebar class="notifications-sidebar"
                   tag="notifications-sidebar"
                   state="collapsed"
                   fixed
                   [end]="sidebar.id !== 'end'">
                   <lib-notioas></lib-notioas>
      </nb-sidebar>
    </nb-layout>
  `,
})
```

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },

    {
      path: 'notificacion_estado',
      loadChildren: () => import('./notificacion_estado/notificacion_estado.module')
        .then(m => {
          console.log(m)
          return m.NotificacionEstadoModule
        })
        .catch(e => console.log(e)),
    },
    {
      path: 'metodo_http',
      loadChildren: () => import('./metodo_http/metodo_http.module')
        .then(m => {
          console.log(m)
          return m.MetodoHttpModule
        })
        .catch(e => console.log(e)),
    },
    {
      path: 'notificacion_tipo',
      loadChildren: () => import('./notificacion_tipo/notificacion_tipo.module')
        .then(m => {
          console.log(m)
          return m.NotificacionTipoModule
        })
        .catch(e => console.log(e)),
    },
    {
      path: 'aplicacion',
      loadChildren: () => import('./aplicacion/aplicacion.module')
        .then(m => {
          console.log(m)
          return m.AplicacionModule
        })
        .catch(e => console.log(e)),
    },
    {
      path: 'perfil',
      loadChildren: () => import('./perfil/perfil.module')
        .then(m => {
          console.log(m)
          return m.PerfilModule
        })
        .catch(e => console.log(e)),
    },
    {
      path: 'notificacion_configuracion',
      loadChildren: () => import('./notificacion_configuracion/notificacion_configuracion.module')
        .then(m => {
          console.log(m)
          return m.NotificacionConfiguracionModule
        })
        .catch(e => console.log(e)),
    },
    {
      path: 'notificacion',
      loadChildren: () => import('./notificacion/notificacion.module')
        .then(m => {
          console.log(m)
          return m.NotificacionModule
        })
        .catch(e => console.log(e)),
    },
    {
      path: 'notificacion_estado_usuario',
      loadChildren: () => import('./notificacion_estado_usuario/notificacion_estado_usuario.module')
        .then(m => {
          console.log(m)
          return m.NotificacionEstadoUsuarioModule
        })
        .catch(e => console.log(e)),
    },
    {
      path: 'parametro',
      loadChildren: () => import('./parametro/parametro.module')
        .then(m => {
          console.log(m)
          return m.ParametroModule
        })
        .catch(e => console.log(e)),
    },
    {
      path: 'notificacion_configuracion_perfil',
      loadChildren: () => import('./notificacion_configuracion_perfil/notificacion_configuracion_perfil.module')
        .then(m => {
          console.log(m)
          return m.NotificacionConfiguracionPerfilModule
        })
        .catch(e => console.log(e)),
    },
    {
      path: 'menu_opcion',
      loadChildren: () => import('./menu_opcion/menu_opcion.module')
        .then(m => {
          console.log(m)
          return m.MenuOpcionModule
        })
        .catch(e => console.log(e)),
    },
    {
      path: 'perfil_x_menu_opcion',
      loadChildren: () => import('./perfil_x_menu_opcion/perfil_x_menu_opcion.module')
        .then(m => {
          console.log(m)
          return m.PerfilXMenuOpcionModule
        })
        .catch(e => console.log(e)),
    },
    {
      path: 'menu_opcion_padre',
      loadChildren: () => import('./menu_opcion_padre/menu_opcion_padre.module')
        .then(m => {
          console.log(m)
          return m.MenuOpcionPadreModule
        })
        .catch(e => console.log(e)),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}


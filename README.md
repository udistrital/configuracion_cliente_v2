# Configuracion Cliente - Version 2
En este repositorio se define la tecnología que se renderizara del lado del cliente.
Como componentes básicos cuenta con:
 * **ngxAdmin** ~ [link_documentación](https://github.com/akveo/ngx-admin)
 * **Angular 7**
 * **Bootstrap 4**
 * **Nebular Components**
 
<summary><h2> 🛠️ Configuracion del proyecto</h2></summary>
<details>
  - Clonar el proyecto del repositorio de git, configurar el repositorio remoto (github), e instalarlo localmente con 
  
  ```shell 
      npm install
  ```
  - 🚀 Correr el proyecto para verificar que las dependencias estan correctamente instaladas

  ```shell 
      ng serve ó npm start
  ```
</details>
<summary><h2> Dependencias Utilizadas</h2></summary>
<details>
    Dependencias incluidas:

  - **Nebular:** (https://github.com/akveo/nebular)
  - **Angular 7**
  - **Bootstrap 4** 

  ### API CRUD
  - **configuracion_api:** este [api](https://github.com/udistrital/configuracion_api/tree/test). se encarga de configurar tanto los menus como las notificaciones de los clientes.

  ### SERVICIO WEBSOCKET
  - **notificacion_api:** este [servicio](https://github.com/udistrital/notificacion_api/tree/test). se encarga de registrarse y enviar mensajes teniendo en cuenta id de usuario y perfil por medio de websockets.

  ### Herramientas usadas
  - **ngxGenerator:** este [generador](https://github.com/BOTOOM/ngxGenerator) se encarga de crear una un proyecto con las caracteristicas descritas en el repositorio.
  - **ngx-admin:** este [template](https://github.com/akveo/ngx-admin) es el que utiliza ngxGenerator, esta basado en Angular 7+, Bootstrap 4 y Nebular.

  ### Variables de entorno
  <details>  
  
  - **Configuracion Local**
  ```typescript 
    export const environment = {
        production: false,
        NUXEO: {
            PATH: 'https://documental.udistrital.edu.co/nuxeo/',
        },
        CONFIGURACION_SERVICE: 'http://localhost:8088/v1/',
        NOTIFICACION_SERVICE: 'ws://localhost:8080/ws/join',
        CONF_MENU_SERVICE: 'http://10.20.0.254/configuracion_api/v1/menu_opcion_padre/ArbolMenus/',
        TOKEN: {
            AUTORIZATION_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize',
            CLIENTE_ID: '3Idp5LUlnZY7cOV10NaLuyRfzooa',
            RESPONSE_TYPE: 'id_token token',
            SCOPE: 'openid email role documento',
            REDIRECT_URL: 'http://localhost:4200/',
            SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
            SIGN_OUT_REDIRECT_URL: 'http://localhost:4200/',
        },
    };
  ```

  - **Configuracion 254**
  ```typescript 
    export const environment = {
        production: false,
        NUXEO: {
            PATH: 'https://documental.udistrital.edu.co/nuxeo/',
        },
        CONFIGURACION_SERVICE: 'http://10.20.0.254/configuracion_api/v1/',
        NOTIFICACION_SERVICE: 'ws://10.20.0.254/notificacionws/ws/join',
        CONF_MENU_SERVICE: 'http://10.20.0.254/configuracion_api/v1/menu_opcion_padre/ArbolMenus/',
        TOKEN: {
            AUTORIZATION_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize',
            CLIENTE_ID: '3Idp5LUlnZY7cOV10NaLuyRfzooa',
            RESPONSE_TYPE: 'id_token token',
            SCOPE: 'openid email role documento',
            REDIRECT_URL: 'http://localhost:4200/',
            SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
            SIGN_OUT_REDIRECT_URL: 'http://localhost:4200/',
        },
    };
  ```

  - **Configuracion Test**
  ```typescript 
    export const environment = {
        production: false,
        NUXEO: {
            PATH: 'https://documental.udistrital.edu.co/nuxeo/',
        },
        CONFIGURACION_SERVICE: 'http://pruebasapi.intranetoas.udistrital.edu.co:8086/v1/',
        NOTIFICACION_SERVICE: 'ws://pruebasapi.intranetoas.udistrital.edu.co:8116/ws/join',
        CONF_MENU_SERVICE: 'http://10.20.0.254/configuracion_api/v1/menu_opcion_padre/ArbolMenus/',
        TOKEN: {
            AUTORIZATION_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize',
            CLIENTE_ID: '3Idp5LUlnZY7cOV10NaLuyRfzooa',
            RESPONSE_TYPE: 'id_token token',
            SCOPE: 'openid email role documento',
            REDIRECT_URL: 'http://localhost:4200/',
            SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
            SIGN_OUT_REDIRECT_URL: 'http://localhost:4200/',
        },
    };
  ```
  </details>

  ### Comandos para correr configuracion_api
  <details> 
  
  - **Local**
  ```shell 
CONFIGURACION_API_HTTP_PORT=8088 CONFIGURACION_API_DB_USER=crud_user CONFIGURACION_API_DB_PASS=password CONFIGURACION_API_DB_URL=10.20.0.159 CONFIGURACION_API_DB_NAME=udistrital_core_db CONFIGURACION_API_DB_SCHEMA=configuracion CONFIGURACION_SERVICE=http://localhost:8088/v1/ NOTIFICACION_SERVICE=http://localhost:8080/api/ bee run
  ```
  - **Test**
  ```shell 
CONFIGURACION_API_HTTP_PORT=8088 CONFIGURACION_API_DB_USER=crud_user CONFIGURACION_API_DB_PASS=password CONFIGURACION_API_DB_URL=10.20.0.159 CONFIGURACION_API_DB_NAME=udistrital_core_db CONFIGURACION_API_DB_SCHEMA=configuracion CONFIGURACION_SERVICE= http://pruebasapi.intranetoas.udistrital.edu.co:8086/v1/ NOTIFICACION_SERVICE=http://pruebasapi.intranetoas.udistrital.edu.co:8116/api/ bee run
  ```
  - **254**
  ```shell 
CONFIGURACION_API_HTTP_PORT=8088 CONFIGURACION_API_DB_USER=crud_user CONFIGURACION_API_DB_PASS=password CONFIGURACION_API_DB_URL=10.20.0.159 CONFIGURACION_API_DB_NAME=udistrital_core_db CONFIGURACION_API_DB_SCHEMA=configuracion CONFIGURACION_SERVICE=http://10.20.0.254/configuracion_api/v1/ NOTIFICACION_SERVICE=http://10.20.0.254/notificacionws/api/ bee run
  ```
  - **Flyway(BD) + Local(Apis)**
  ```shell 
CONFIGURACION_API_HTTP_PORT=8088 CONFIGURACION_API_DB_USER=test CONFIGURACION_API_DB_PASS=test CONFIGURACION_API_DB_URL=localhost CONFIGURACION_API_DB_NAME=test CONFIGURACION_API_DB_SCHEMA=configuracion CONFIGURACION_SERVICE=http://localhost:8088/v1/ NOTIFICACION_SERVICE=http://localhost:8080/api/ bee run
  ```
  </details>
  
  ### Comandos para correr notificacion_api
  <details> 
  
  - **Local**
  ```shell
CONFIGURACION_SERVICE=http://localhost:8088/v1/ bee run
  ```
  - **Test**
  ```shell
CONFIGURACION_SERVICE= http://pruebasapi.intranetoas.udistrital.edu.co:8086/v1/ bee run
  ```
  - **254**
  ```shell 
CONFIGURACION_SERVICE=http://10.20.0.254/configuracion_api/v1/ bee run
  ```
  </details>
</details>

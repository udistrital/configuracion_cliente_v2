import { environment } from '../environments/environment';
export const Config = {
    LOCAL: {
        NUXEO: {
            PATH: 'https://documental.udistrital.edu.co/nuxeo/',
        },
        WSO2_SERVICE: 'http://jbpm.udistritaloas.edu.co:8280/services',
        DOCUMENTO_SERVICE: 'http://localhost:8094/v1/',
        CONFIGURACION_SERVICE: 'http://10.20.0.254/configuracion_api/v1/',
        NOTIFICACION_SERVICE: 'ws://pruebasapi.intranetoas.udistrital.edu.co:8116/ws/join',
        CONF_MENU_SERVICE: 'http://10.20.0.254/configuracion_api/v1/menu_opcion_padre/ArbolMenus/',
        TOKEN: {
            AUTORIZATION_URL: 'https://autenticacion.udistrital.edu.co/oauth2/authorize',
          CLIENTE_ID: 'qGicYmef58iY7VxyFm8B39995FUa',
          RESPONSE_TYPE: 'id_token token',
          SCOPE: 'openid email role documento',
          REDIRECT_URL: 'http://10.20.0.254/configuracionv2/',
          SIGN_OUT_URL: 'https://autenticacion.udistrital.edu.co/oidc/logout',
          SIGN_OUT_REDIRECT_URL: 'http://10.20.0.254/configuracionv2/',
        },
    },
};

export const GENERAL = {
    ENTORNO: Config[environment.entorno],
    // ENTORNO: 'LOCAL',
};

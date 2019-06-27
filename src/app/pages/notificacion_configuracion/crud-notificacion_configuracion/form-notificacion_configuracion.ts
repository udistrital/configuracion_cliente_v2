
export let FORM_NOTIFICACION_CONFIGURACION = {
    titulo: 'NotificacionConfiguracion',
    tipo_formulario: 'mini',
    btn: 'Guardar',
    alertas: true,
    modelo: 'NotificacionConfiguracion',
    campos: [
    {
        etiqueta: 'input',
        claseGrid: 'col-6',
        nombre: 'Id',
        label_i18n: 'id',
        placeholder_i18n: 'id',
        requerido: true,
        tipo: 'number',
    },
    {
        etiqueta: 'input',
        claseGrid: 'col-6',
        nombre: 'EndPoint',
        label_i18n: 'end_point',
        placeholder_i18n: 'end_point',
        requerido: true,
        tipo: 'text',
    },
    {
        etiqueta: 'selectmultiple',
        claseGrid: 'col-6',
        nombre: 'MetodoHttp',
        label_i18n: 'metodo_http',
        placeholder_i18n: 'metodo_http',
        requerido: true,
        tipo: 'MetodoHttp',
        // key: 'Name',
        opciones: [],
    },
    {
        etiqueta: 'selectmultiple',
        claseGrid: 'col-6',
        nombre: 'Tipo',
        label_i18n: 'tipo',
        placeholder_i18n: 'tipo',
        requerido: true,
        tipo: 'NotificacionTipo',
        // key: 'Name',
        opciones: [],
    },
    {
        etiqueta: 'input',
        claseGrid: 'col-6',
        nombre: 'CuerpoNotificacion',
        label_i18n: 'cuerpo_notificacion',
        placeholder_i18n: 'cuerpo_notificacion',
        requerido: true,
        tipo: 'text',
    },
    {
        etiqueta: 'selectmultiple',
        claseGrid: 'col-6',
        nombre: 'Aplicacion',
        label_i18n: 'aplicacion',
        placeholder_i18n: 'aplicacion',
        requerido: true,
        tipo: 'Aplicacion',
        // key: 'Name',
        opciones: [],
    },
    ],
}

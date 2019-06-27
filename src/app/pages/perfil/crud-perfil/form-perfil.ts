
export let FORM_PERFIL = {
    titulo: 'Perfil',
    tipo_formulario: 'mini',
    btn: 'Guardar',
    alertas: true,
    modelo: 'Perfil',
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
        nombre: 'Nombre',
        label_i18n: 'nombre',
        placeholder_i18n: 'nombre',
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

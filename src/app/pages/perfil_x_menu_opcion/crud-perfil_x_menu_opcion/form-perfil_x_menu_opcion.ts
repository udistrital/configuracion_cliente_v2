
export let FORM_PERFIL_X_MENU_OPCION = {
    titulo: 'PerfilXMenuOpcion',
    tipo_formulario: 'mini',
    btn: 'Guardar',
    alertas: true,
    modelo: 'PerfilXMenuOpcion',
    campos: [
    {
        etiqueta: 'input',
        claseGrid: 'col-6',
        nombre: 'Perfil',
        label_i18n: 'perfil',
        placeholder_i18n: 'perfil',
        requerido: true,
        tipo: 'number',
    },
    {
        etiqueta: 'select',
        claseGrid: 'col-6',
        nombre: 'Opcion',
        label_i18n: 'opcion',
        placeholder_i18n: 'opcion',
        requerido: true,
        tipo: 'MenuOpcion',
        // key: 'Name',
        opciones: [],
    },
    ],
}

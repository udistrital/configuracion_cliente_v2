
export const FORM_APLICACION = {
    titulo: 'Aplicacion',
    tipo_formulario: 'mini',
    btn: 'Guardar',
    alertas: true,
    modelo: 'Aplicacion',
    campos: [
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
            etiqueta: 'input',
            claseGrid: 'col-6',
            nombre: 'Descripcion',
            label_i18n: 'descripcion',
            placeholder_i18n: 'descripcion',
            requerido: true,
            tipo: 'text',
        },
        {
            etiqueta: 'input',
            claseGrid: 'col-6',
            nombre: 'Dominio',
            label_i18n: 'dominio',
            placeholder_i18n: 'dominio',
            requerido: true,
            tipo: 'text',
        },
        {
            etiqueta: 'input',
            claseGrid: 'col-6',
            nombre: 'Alias',
            label_i18n: 'alias',
            placeholder_i18n: 'alias',
            requerido: false,
            tipo: 'text',
        },
        {
            etiqueta: 'input',
            claseGrid: 'col-6',
            nombre: 'EstiloIcono',
            label_i18n: 'estilo_icono',
            placeholder_i18n: 'estilo_icono',
            requerido: false,
            tipo: 'text',
        },
        {
            etiqueta: 'checkbox',
            claseGrid: 'col-6',
            nombre: 'Estado',
            label_i18n: 'estado',
            placeholder_i18n: 'estado',
            requerido: true,
            tipo: 'checkbox',
        },
    ],
};

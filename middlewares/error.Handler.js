export const manejadorDeErrores = (err, req, res, next) => {
    console.log(err.stack, `Error crítico`)

    if(err.code === 'P2002'){
        return res.status(409).json({
            status: 'Error',
            message: `El registro ya existe en la base de datos, intenta de nuevo`
        })
    }

    if(err.message === 'Credenciales inválidas'){
        return res.status(401).json({
            status: 'Error',
            message: err.message
        })
    }

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            status: 'Error de Sintaxis',
            message: 'El formato JSON enviado es inválido. Revisa que todas las claves tengan comillas dobles y no sobren comas.'
        });
    }

    //atrapa cualquier error 
    return res.status(500).json({
        status: 'Error',
        message: 'Ocurrió un error interno con el servidor. El equipo ya fue notificado',
        error: err.error
    })
}
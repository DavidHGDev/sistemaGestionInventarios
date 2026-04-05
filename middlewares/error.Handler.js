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

    //atrapa cualquier error 
    return res.status(500).json({
        status: 'Error',
        message: 'Ocurrió un error interno con el servidor. El equipo ya fue notificado'
    })
}
export  const validarSchema = (schema) => {
    return (req, res, next) => {
        //lo primero, validar lo que viene en el cuerpo de la petición
        const result = schema.safeParse(req.body);

        //validamos si tiene errores
        if(!result.success){
            return res.status(400).json({
                status: 'Error de validación',
                errors: result.error.errors.map(err => ({
                    campo: err.path[0],
                    message: err.message
                }))
            })
        }

        //si la validación salió bien y no tiene errors, se sobre escribe body
        req.body = result.data;
        next();
    };
};
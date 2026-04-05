
export  const validarSchema = (schema, property = 'body') => {
    return (req, res, next) => {
        //lo primero, validar lo que viene en el cuerpo de la petición
        const result = schema.safeParse(req[property]);

        //validamos si tiene errores
        if(!result.success){
            const erroresDetectados = result.error.issues || result.error.errors || [];
            return res.status(400).json({
                status: 'Error de validación',
                errors: erroresDetectados.map(err => ({
                    campo: err.path[0],
                    message: err.message
                }))
            })
        }

        //si la validación salió bien y no tiene errors, se sobre escribe body
        req[property] = result.data;
        next();
    };
};
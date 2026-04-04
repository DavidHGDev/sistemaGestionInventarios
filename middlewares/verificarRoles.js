export const  verficarRoles = (rolesPermitidos) => {
    return (req, res, next) => {
        const usuarioActual = req.usuario;
        if(!usuarioActual){
            return res.status(401).json({status: 'Error', message: 'Usuario no autenticado'})
        }

        if(!rolesPermitidos.includes(usuarioActual.role)){
            return res.status(403).json({
                status: 'Error',
                message: `Acceso denegado: solo están permitidos los roles ${rolesPermitidos.join(', ')}`
            })
        }

        next();
    }
}
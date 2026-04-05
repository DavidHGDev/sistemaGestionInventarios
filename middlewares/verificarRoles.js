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

export const verificarMismoUsuarioOadmin = (req, res, next) => {
    const userLogueadoId = req.usuario.id;
    const roleUserLogueado = req.usuario.role;

    const idAEditar = Number(req.params.id);

    if(roleUserLogueado === 'ADMIN'){
        return next();
    }

    if(userLogueadoId === idAEditar){
        return next();
    }

    return res.status(403).json({
        status: 'Error',
        message: 'Acceso denegado, no tiene permiso para modificar la cuenta'
    })
}
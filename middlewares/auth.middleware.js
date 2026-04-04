import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1] //¿qué significa este apartado?
    if(!token){
        return res.status(401).json({
            status: 'Error',
            message: 'Acceso denegado, no se encontró el token de seguridad'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            status: 'Error',
            message: 'Token inválido o expirado'
        })
    }
}
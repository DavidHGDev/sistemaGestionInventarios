import AuthLogin from '../services/auth.services.js'

export async function authLogin(req, res) {
    try {
        const { email, password } = req.body;
        const login = await AuthLogin.login(email, password);
        res.status(200).json(login)
    } catch (error) {
        res.status(401).json({ status: 'Error', message: error.message })
    }
}
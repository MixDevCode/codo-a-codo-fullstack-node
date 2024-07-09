const jwt = require("jsonwebtoken");
module.exports = {
    validatePassword: (req, res, next) => {
        try {
            const password = req.body.password;

            if(password.length < 8) {
                return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres" });
            } else if (!password.match(/[a-z]/g)) {
                return res.status(400).json({ message: "La contraseña debe tener al menos una letra minúscula" });
            } else if (!password.match(/[A-Z]/g)) {
                return res.status(400).json({ message: "La contraseña debe tener al menos una letra mayúscula" });
            } else if (!password.match(/[0-9]/g)) {
                return res.status(400).json({ message: "La contraseña debe tener al menos un número" });
            } else if (!password.match(/[^a-zA-Z0-9]/g)) {
                return res.status(400).json({ message: "La contraseña debe tener al menos un caracter especial" });
            } else {
                next();
            }
        } catch (error) {
            console.log(error);
        }
    },
    validateEmail: (req, res, next) => {
        try {
            const email = req.body.email;

            if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                return res.status(400).json({ message: "El correo no es válido" });
            } else {
                next();
            }
        } catch (error) {
            console.log(error);
        }
    },
    verifyToken: async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            if(!token) {
                return res.status(401).json({ message: "Token no encontrado" });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            console.log(error);
        }
    },
    verifyRole: (req, res, next) => {
        try {
            if(req.user.rol === "admin") {
                next();
            } else {
                return res.status(403).json({ message: "No tienes los permisos suficientes" });
            }
        } catch (error) {
            console.log(error);
        }
    }
}
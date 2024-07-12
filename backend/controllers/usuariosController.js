const db = require("../db");
const bcrypt = require("bcryptjs");
const sendMail = require("../tools/sendMail");
const jwt = require("jsonwebtoken");

module.exports = {
    crearUsuario: async (req, res) => {
        try {
            let tokenUser;
            if(req.body.verificado) {
                if(!req.headers.authorization) {
                    return res.status(401).json({ message: "Token no encontrado", error: "Token no encontrado" });
                }
                tokenUser = req.headers.authorization.split(" ")[1];
                if(!tokenUser) {
                    return res.status(401).json({ message: "Token no encontrado", error: "Token no encontrado" });
                }
                const decoded = jwt.verify(tokenUser, process.env.JWT_SECRET);
                if(decoded.rol !== "admin" && req.body.verificado) {
                    return res.status(401).json({ message: "No tienes permisos para realizar esta operación", error: "No tienes permisos para realizar esta operación" });
                }
            }
            const password = bcrypt.hashSync(req.body.password, 10);
            req.body.password = password;
            const sqlUser = "SELECT * FROM usuarios WHERE correo = ?";
            const [rowsUser] = await db.promise().query(sqlUser, [req.body.correo]);
            if(rowsUser.length > 0) {
                return res.status(401).json({ message: "El correo ya existe", error: "El correo ya existe" });
            }
            const token = jwt.sign({ email: req.body.correo }, process.env.JWT_SECRET);
            const sql = "INSERT INTO usuarios SET ?";
            const [rows] = await db.promise().query(sql, [req.body]);
            sendMail.sendVerificationCode(req.body.correo, token);
            res.status(200).json({ message: "Usuario creado con éxito" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al crear el usuario", error: true });
        }
    },
    eliminarUsuario: async (req, res) => {
        try {
            const id = req.query.id;
            // get user by email from req.user.email
            const sqlUser = "SELECT * FROM usuarios WHERE id = ?";
            const [rowsUser] = await db.promise().query(sqlUser, [id]);
            if([rowsUser[0].correo] == req.user.email) {
                return res.status(401).json({ message: "No puedes eliminar tu usuario", error: true });
            }
            const sql = "DELETE FROM usuarios WHERE id = ?";
            const [rows] = await db.promise().query(sql, [id]);
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al eliminar el usuario", error: true });
        }
    },
    getUserInformation: async (req, res) => {
        try {
            const sql = "SELECT * FROM usuarios WHERE id = ?";
            const [rows] = await db.promise().query(sql, [req.user.id]);
            if (rows.length > 0) {
                res.json(rows[0]);
            } else {
                res.status(404).json({ message: "No se encontraron resultados", error: true });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al obtener la información del usuario", error: true });
        }
    },
    getAllUsuariosDT: async (req, res) => {
        try {
            const sql = "SELECT * FROM usuarios ORDER BY id DESC";
            const [rows] = await db.promise().query(sql);
    
            // Formatear los datos para DataTables
            const response = {
                data: rows // DataTables espera los datos en una propiedad "data"
            };
    
            res.json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al obtener los usuarios" });
        }
    },
    activateUsuario: async (req, res) => {
        try {
            if(!req.body.token) {
                return res.status(404).json({ message: "Token no encontrado", error: true });
            }
            const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
            if(!decoded) {
                return res.status(401).json({ message: "Token inválido", error: true });
            }
            const sql = "UPDATE usuarios SET verificado = 1 WHERE correo = ?";
            const [rows] = await db.promise().query(sql, [decoded.email]);
            if (rows.affectedRows > 0) {
                const token = jwt.sign({ id: rows.insertId }, process.env.JWT_SECRET);
                res.cookie("token", token, {
                    httpOnly: true
                });
                res.status(200).json({ message: "Usuario verificado con exito" });
            } else {
                res.status(404).json({ message: "Token inválido", error: true });
            }
        } catch (error) {
            console.log(error);
        }
    },
    modificarUsuario: async (req, res) => {
        try {
            const sql = "UPDATE usuarios SET ? WHERE id = ?";
            const [rows] = await db.promise().query(sql, [req.body, req.params.id]);
            if (rows.affectedRows > 0) {
                res.status(200).json({ message: "Usuario modificado con exito" });
            } else {
                res.status(404).json({ message: "Usuario no encontrado", error: true });
            }
        } catch (error) {
            console.log(error);
        }
    },
    login: async (req, res) => {
        try {
            const sql = "SELECT * FROM usuarios WHERE correo = ?";
            const [rows] = await db.promise().query(sql, [req.body.email]);
            if (rows.length > 0) {
                const user = rows[0];
                if(user.verificado === 0) {
                    return res.status(401).json({ message: "Usuario no verificado... Por favor, verifique su correo", error: true });
                }
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const token = jwt.sign({ id: user.id, rol: user.rol, email: user.correo }, process.env.JWT_SECRET);
                    res.status(200).json({ message: "Login exitoso", token: token });
                } else {
                    res.status(401).json({ message: "Contraseña incorrecta", error: true });
                }
            } else {
                res.status(404).json({ message: "Usuario no encontrado", error: true });
            }
        } catch (error) {
            console.log(error);
        }
    },
    getAllUsuarios: async (req, res) => {
        try {
            const sql = "SELECT * FROM usuarios ORDER BY id DESC";
            const [rows] = await db.promise().query(sql);
            res.status(200).json(rows);
        } catch (error) {
            console.log(error);
        }
    }
}
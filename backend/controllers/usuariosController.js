const db = require("../db");
const bcrypt = require("bcryptjs");
const sendMail = require("../tools/sendMail");
const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");

module.exports = {
    crearUsuario: async (req, res) => {
        try {
            const token = crypto.randomBytes(32).toString('hex');
            req.body.token = token;
            const password = bcrypt.hashSync(req.body.password, 10);
            req.body.password = password;
            const sql = "INSERT INTO usuarios SET ?";
            const [rows] = await db.promise().query(sql, [req.body]);
            sendMail.sendVerificationCode(req.body.correo, token);
            res.status(200).json({ message: "Usuario creado con éxito" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al crear el usuario" });
        }
    },
    activateUsuario: async (req, res) => {
        try {
            const sql = "UPDATE usuarios SET verificado = 1 WHERE token = ?";
            const [rows] = await db.promise().query(sql, [req.body.token]);
            if (rows.affectedRows > 0) {
                const token = jwt.sign({ id: rows.insertId }, process.env.JWT_SECRET);
                res.cookie("token", token, {
                    httpOnly: true
                });
                res.status(200).json({ message: "Usuario verificado con exito" });
            } else {
                res.status(404).json({ message: "Token inválido" });
            }
        } catch (error) {
            console.log(error);
        }
    }
}
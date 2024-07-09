const express = require("express");
const { usuariosController } = require("../controllers");
const router = express.Router();

router.post("/crearUsuario", usuariosController.crearUsuario);
router.put("/activarUsuario", usuariosController.activateUsuario);

module.exports = router;
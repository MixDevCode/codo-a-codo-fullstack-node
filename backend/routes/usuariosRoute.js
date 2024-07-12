const express = require("express");
const { usuariosController } = require("../controllers");
const usuariosMiddleware = require("../middlewares/usuariosMiddleware");
const router = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
});

const upload = multer({ storage: storage })

router.post("/crearUsuario",[upload.none()], usuariosController.crearUsuario);
router.put("/activarUsuario", [upload.none()], usuariosController.activateUsuario);
router.post("/login", [upload.none()], usuariosController.login);
router.get("/getUserInformation", [usuariosMiddleware.verifyToken], usuariosController.getUserInformation);
router.get("/getAdminInformation", [usuariosMiddleware.verifyToken, usuariosMiddleware.verifyRole], usuariosController.getUserInformation);
router.get("/getAllUsuarios", usuariosController.getAllUsuarios);
router.get("/getAllUsuariosDT", usuariosController.getAllUsuariosDT);
router.put("/modificarUsuario", [usuariosMiddleware.verifyToken, usuariosMiddleware.verifyRole], usuariosController.modificarUsuario);
router.delete("/eliminarUsuario", [usuariosMiddleware.verifyToken, usuariosMiddleware.verifyRole], usuariosController.eliminarUsuario);

module.exports = router;
const express = require("express");
const formularioController = require("../controllers/formularioController");
const router = express.Router();

router.post("/enviarFormulario", formularioController.enviarFormulario);

module.exports = router;
const express = require("express");
const router = express.Router();
const { productosController } = require("../controllers");

router.get("/filtrarProductos", productosController.filtrarProductos);
router.get("/obtenerCategorias", productosController.obtenerCategorias);
router.get("/obtenerMarcas", productosController.obtenerMarcas);
router.get("/getAllProductos", productosController.getAllProductos);
router.get("/buscarProductoPorId", productosController.filtrarPorId);

// admin
router.post("/agregarProducto", productosController.agregarProducto);
router.put("/modificarProducto", productosController.modificarProducto);
router.delete("/eliminarProducto", productosController.eliminarProducto);

module.exports = router;
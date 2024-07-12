const express = require("express");
const router = express.Router();
const { productosController } = require("../controllers");
const multer  = require('multer')
const usuariosMiddleware = require("../middlewares/usuariosMiddleware");
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

var upload = multer({ storage: storage })


router.get("/filtrarProductos", productosController.filtrarProductos);
router.get("/obtenerCategorias", productosController.obtenerCategorias);
router.get("/obtenerMarcas", productosController.obtenerMarcas);
router.get("/getAllProductos", productosController.getAllProductos);
router.get("/buscarProductoPorId", productosController.filtrarPorId);
router.get("/getAllProductosDT", [usuariosMiddleware.verifyToken, usuariosMiddleware.verifyRole],productosController.getAllProductosDT);
router.get("/getAllCategoriasDT", [usuariosMiddleware.verifyToken, usuariosMiddleware.verifyRole],productosController.getAllCategoriasDT);
router.get("/getAllMarcasDT", [usuariosMiddleware.verifyToken, usuariosMiddleware.verifyRole], productosController.getAllMarcasDT);
router.get("/images/:image", productosController.getMarcaImages);

router.post("/agregarMarca", [upload.single('imagen'), usuariosMiddleware.verifyToken, usuariosMiddleware.verifyRole], productosController.agregarMarca);
router.post("/agregarCategoria", [upload.none(), usuariosMiddleware.verifyToken, usuariosMiddleware.verifyRole], productosController.agregarCategoria);
router.put("/modificarMarca", [upload.single('imagen'), usuariosMiddleware.verifyToken, usuariosMiddleware.verifyRole], productosController.modificarMarca);
router.put("/modificarCategoria", [upload.single('imagen'), usuariosMiddleware.verifyToken, usuariosMiddleware.verifyRole],productosController.modificarCategoria);
router.delete("/eliminarMarca", [usuariosMiddleware.verifyToken, usuariosMiddleware.verifyRole], productosController.eliminarMarca);
router.delete("/eliminarCategoria", [usuariosMiddleware.verifyToken, usuariosMiddleware.verifyRole], productosController.eliminarCategoria);
router.get("/buscarMarcaPorId", productosController.obtenerMarcaPorId);
router.get("/buscarCategoriaPorId", productosController.obtenerCategoriaPorId);

// admin
router.post("/agregarProducto", [upload.single('imagen'), usuariosMiddleware.verifyToken, usuariosMiddleware.verifyRole], productosController.agregarProducto);
router.put("/modificarProducto", [upload.single('imagen'), usuariosMiddleware.verifyToken, usuariosMiddleware.verifyRole], productosController.modificarProducto);
router.delete("/eliminarProducto", [usuariosMiddleware.verifyToken, usuariosMiddleware.verifyRole], productosController.eliminarProducto);

module.exports = router;
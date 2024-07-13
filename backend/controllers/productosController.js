const moment = require("moment/moment");
const db = require("../db");
const path = require('path');
module.exports = {
    getAllProductos: async (req, res) => {
        try {
            const sql = "SELECT * FROM productos ORDER BY id DESC";
            const [rows] = await db.promise().query(sql);
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al obtener los productos", error });
        }
    },
    getAllProductosDT: async (req, res) => {
        try {
            const sql = "SELECT * FROM productos ORDER BY id DESC";
            const [rows] = await db.promise().query(sql);
    
            // Formatear los datos para DataTables
            const response = {
                data: rows // DataTables espera los datos en una propiedad "data"
            };
    
            res.json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al obtener los productos", error: error });
        }
    },
    getAllCategoriasDT: async (req, res) => {
        try {
            const sql = "SELECT * FROM categorias ORDER BY id DESC";
            const [rows] = await db.promise().query(sql);
    
            // Formatear los datos para DataTables
            const response = {
                data: rows // DataTables espera los datos en una propiedad "data"
            };
    
            res.json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al obtener las categorías", error: error });
        }
    },
    getAllMarcasDT: async (req, res) => {
        try {
            const sql = "SELECT * FROM marcas ORDER BY id DESC";
            const [rows] = await db.promise().query(sql);
    
            // Formatear los datos para DataTables
            const response = {
                data: rows // DataTables espera los datos en una propiedad "data"
            };
    
            res.json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al obtener las marcas", error: error });
        }
    },
    obtenerCategorias: async (req, res) => {
        try {
            const sql = "SELECT id, nombre, (SELECT COUNT(*) FROM productos WHERE id_categoria = categorias.id) as count FROM categorias";
            const [rows] = await db.promise().query(sql);
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al obtener las categorías", error: error });
        }
    },
    getMarcaImages(req, res) {
        const imagePath = path.join(__dirname, `../images/${req.params.image}`);
        res.sendFile(imagePath);
    },
    obtenerMarcas: async (req, res) => {
        try {
            // also get count from items
            const sql = "SELECT id, nombre, imagen, convenio, (SELECT COUNT(*) FROM productos WHERE id_marca = marcas.id) as count FROM marcas";
            const [rows] = await db.promise().query(sql);
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al obtener las categorías", error: error });
        }
    },
    filtrarProductos: async (req, res) => {
        try {
            const query = req.query.query;
            const categoria = req.query.categoria;
            const orden = req.query.orden;
            const limite = req.query.limite;
            const marca = req.query.marca;

            //// validaciones
            let sql = `SELECT * FROM productos`;
            const conditions = [];
            const params = [];

            // filtros
            if(query) {
                conditions.push(`nombre LIKE ?`);
                params.push(`%${query}%`);
            }

            if(categoria) {
                conditions.push(`id_categoria = ?`);
                params.push(`${categoria}`);
            }

            if(marca) {
                conditions.push(`id_marca LIKE ?`);
                params.push(`%${marca}%`);
            }

            if (conditions.length > 0) {
                sql += " WHERE " + conditions.join(" AND ");
            }
            
            if (orden) {
                if(orden.toLowerCase() === "all") {
                    sql += ` ORDER BY id DESC`;
                } else {
                    sql += ` ORDER BY nombre ?`;
                    params.push(orden);
                }
            }
            
            if (limite) {
                sql += ` LIMIT ?`;
                params.push(Number(limite));
            }
            
            // llamada a la db
            const [rows] = await db.promise().query(sql, params);
            if (rows.length > 0) {
                res.json(rows);
            } else {
                res.status(404).json({ message: "No se encontraron resultados", error: true });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al obtener los productos", error: true });
        }
    },
    filtrarPorId: async (req, res) => {
        try {
            const id = req.query.id;
            const sql = "SELECT productos.*, marcas.nombre as marca, categorias.nombre as categoria, marcas.id as id_marca, categorias.id as id_categoria FROM productos INNER JOIN marcas ON productos.id_marca = marcas.id INNER JOIN categorias ON productos.id_categoria = categorias.id WHERE productos.id = ?";
            const [rows] = await db.promise().query(sql, [id]);
            if (rows.length > 0) {
                res.json(rows[0]);
            } else {
                res.status(404).json({ message: "No se encontro el producto", error: true });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al obtener el producto", error: true });
        }
    },
    obtenerMarcaPorId: async (req, res) => {
        try {
            const id = req.query.id;
            const sql = "SELECT * FROM marcas WHERE id = ?";
            const [rows] = await db.promise().query(sql, [id]);
            if (rows.length > 0) {
                res.json(rows[0]);
            } else {
                res.status(404).json({ message: "No se encontro la marca", error: true });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al obtener la marca", error: true });
        }
    },
    obtenerCategoriaPorId: async (req, res) => {
        try {
            const id = req.query.id;
            const sql = "SELECT * FROM categorias WHERE id = ?";
            const [rows] = await db.promise().query(sql, [id]);
            if (rows.length > 0) {
                res.json(rows[0]);
            } else {
                res.status(404).json({ message: "No se encontro la categoria", error: true });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al obtener la categoria", error: true });
        }
    },
    //admin, a probar
    agregarProducto: async (req, res) => {
        try {
            req.body.imagen = req.file.filename;
            const sql = "INSERT INTO productos SET ?";
            const [rows] = await db.promise().query(sql, [req.body]);
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al crear el producto", error: true });
        }
    },
    eliminarProducto: async (req, res) => {
        try {
            const id = req.query.id;
            const sql = "DELETE FROM productos WHERE id = ?";
            const [rows] = await db.promise().query(sql, [id]);
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al eliminar el producto", error: true });
        }
    },
    agregarMarca: async (req, res) => {
        try {
            // get filename and extension
            req.body.imagen = req.file.filename;
            //format date by dd/mm/yyyy
            req.body.fecha_adicion = moment().format("YYYY/MM/DD");
            const sql = "INSERT INTO marcas SET ?";
            const [rows] = await db.promise().query(sql, [req.body]);
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al crear la marca", error: true });
        }
    },
    eliminarMarca: async (req, res) => {
        try {
            const id = req.query.id;
            const sql = "DELETE FROM marcas WHERE id = ?";
            const [rows] = await db.promise().query(sql, [id]);
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al eliminar la marca", error: true });
        }
    },
    agregarCategoria: async (req, res) => {
        try {
            const sql = "INSERT INTO categorias SET ?";
            const [rows] = await db.promise().query(sql, [req.body]);
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al crear la categoria", error: true });
        }
    },
    eliminarCategoria: async (req, res) => {
        try {
            const id = req.query.id;
            const sql = "DELETE FROM categorias WHERE id = ?";
            const [rows] = await db.promise().query(sql, [id]);
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al eliminar la categoria", error: true });
        }
    },
    modificarMarca: async (req, res) => {
        try {
            const sql = "UPDATE marcas SET ? WHERE id = ?";
            const [rows] = await db.promise().query(sql, [req.body, req.query.id]);
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al actualizar la marca", error: true });
        }
    },
    modificarCategoria: async (req, res) => {
        try {
            const sql = "UPDATE categorias SET ? WHERE id = ?";
            const [rows] = await db.promise().query(sql, [req.body, req.query.id]);
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al actualizar la categoria", error: true });
        }
    },
    modificarProducto: async (req, res) => {
        try {
            if(req.file) {
                req.body.imagen = req.file.filename;
            }
            const sql = "UPDATE productos SET ? WHERE id = ?";
            const [rows] = await db.promise().query(sql, [req.body, req.query.id]);
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al actualizar el producto", error: true });
        }
    }
}
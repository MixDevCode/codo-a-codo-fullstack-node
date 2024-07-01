const db = require("../db");

module.exports = {
    getAllProductos: async (req, res) => {
        try {
            const sql = "SELECT * FROM productos ORDER BY id DESC";
            const [rows] = await db.promise().query(sql);
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al obtener los productos" });
        }
    },
    obtenerCategorias: async (req, res) => {
        try {
            const sql = "SELECT id, nombre, (SELECT COUNT(*) FROM productos WHERE id_categoria = categorias.id) as count FROM categorias";
            const [rows] = await db.promise().query(sql);
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al obtener las categorías" });
        }
    },
    obtenerMarcas: async (req, res) => {
        try {
            // also get count from items
            const sql = "SELECT id, nombre, (SELECT COUNT(*) FROM productos WHERE id_marca = marcas.id) as count FROM marcas";
            const [rows] = await db.promise().query(sql);
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al obtener las categorías" });
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
                conditions.push(`categoria LIKE ?`);
                params.push(`%${categoria}%`);
            }

            if(marca) {
                conditions.push(`id_marca LIKE ?`);
                params.push(`%${marca}%`);
            }

            if (conditions.length > 0) {
                sql += " WHERE " + conditions.join(" AND ");
            } else {
                return res.status(400).json({ message: "Faltan filtros" });
            }
            
            if (orden) {
                sql += ` ORDER BY ?`;
                params.push(orden);
            }
            
            if (limite) {
                sql += ` LIMIT ?`;
                params.push(limite);
            }
            
            // llamada a la db
            const [rows] = await db.promise().query(sql, params);
            if (results.length > 0) {
                res.json(rows);
            } else {
                res.status(404).json({ message: "No se encontraron resultados" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al obtener los productos" });
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
                res.status(404).json({ message: "No se encontro el producto" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al obtener el producto" });
        }
    },
    //admin, a probar
    agregarProducto: async (req, res) => {
        try {
            const sql = "INSERT INTO productos SET ?";
            const [rows] = await db.promise().query(sql, [req.body]);
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al crear el producto" });
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
            res.status(500).json({ message: "Error al eliminar el producto" });
        }
    },
    modificarProducto: async (req, res) => {
        try {
            const sql = "UPDATE productos SET ? WHERE id = ?";
            const [rows] = await db.promise().query(sql, [req.body, req.query.id]);
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al actualizar el producto" });
        }
    }
}
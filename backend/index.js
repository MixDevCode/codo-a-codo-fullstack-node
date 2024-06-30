const express = require("express");
const app = express();
const router = express.Router();
require("dotenv").config();
const port = process.env.PORT || 3000;

// aceptar json
app.use(express.json());

// cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

// rutas
router.use("/productos", require("./routes/productosRoute"));
router.use("/usuarios", require("./routes/usuariosRoute"));
router.use("/formulario", require("./routes/formularioRoute"));

// servidor
app.use("/", router);

// levantar servidor
app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port " + port);
})
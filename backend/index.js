const express = require("express");
const app = express();
const router = express.Router();
require("dotenv").config();
const port = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");


// aceptar json
app.use(express.json());
app.use(cookieParser());

// cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Key, Authorization"
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
});
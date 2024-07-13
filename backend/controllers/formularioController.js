const { sendFormulario } = require("../tools/sendMail");

module.exports = {
    enviarFormularioContacto: (req, res) => {
        try {
           sendFormulario(req.body.name, req.body.email, req.body.subject, req.body.message);
           res.status(200).json({ message: "Formulario enviado" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error al enviar el formulario" });
        }
    }
}
const nodemailer = require("nodemailer");

const mailer = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

module.exports = {
    enviarFormulario: (req, res) => {
        try {
            mailer.sendMail({
                from: process.env.MAIL_USER,
                to: process.env.MAIL_TO,
                subject: req.body.subject,
                text: req.body.message
            }).then(() => {
                res.status(200).json({ message: "Formulario enviado correctamente" });
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error al enviar el formulario" });
        }
    }
}
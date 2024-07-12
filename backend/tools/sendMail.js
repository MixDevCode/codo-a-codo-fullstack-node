const nodemailer = require("nodemailer");
const fs = require("fs");

const mailer = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

module.exports = {
    sendVerificationCode: async(mail, token) => {
        try {
            let htmlTemplate = fs.readFileSync("templates/verification.html", "utf-8");

            htmlTemplate = htmlTemplate.replace(/{{token}}/g, token);
            htmlTemplate = htmlTemplate.replace(/{{mail}}/g, mail);

            mailer.sendMail({
                from: `Insutech <${process.env.MAIL_USER}>`,
                to: mail,
                subject: "Verifica tu cuenta",
                html: htmlTemplate
            }).then(() => {
                return true;
            })
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    sendFormulario: async(name, mail, subject, message) => {
        try {
            mailer.sendMail({
                from: `Insutech <${process.env.MAIL_USER}>`,
                to: process.env.MAIL_OWN,
                subject: subject,
                html: `
                <div style="text-align: center;">
                    <h1>${name}</h1>
                    <h3>${mail}</h3>
                    <p>${message}</p>
                </div>
                `
            }).then(() => {
                return true;
            })
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}
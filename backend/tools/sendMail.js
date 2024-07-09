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
            let htmlTemplate = fs.readFileSync("../templates/verification.html", "utf-8");

            htmlTemplate = htmlTemplate.replace("{{token}}", token);
            htmlTemplate = htmlTemplate.replace("{{mail}}", mail);

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
    }
}
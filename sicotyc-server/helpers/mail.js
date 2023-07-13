const nodemailer = require('nodemailer');

async function sendMailContacto(mailSenders, copyMailSenders, hiddenMailSenders, subject, body) {
    
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        secure: true,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_CONTACTO,
          pass: process.env.MAIL_CONTACTO_PWD,
        },
      });

    try {
            // Configure mail
            const mail = {
                from: 'Sicotyc <' + process.env.MAIL_CONTACTO + '>',
                to: mailSenders.join(','),
                cc: copyMailSenders ? copyMailSenders.join(',') : null,
                bcc: hiddenMailSenders ? hiddenMailSenders.join(',') : null,
                subject,
                html: body
            };
            
            // send mail
            const info = await transporter.sendMail(mail);
            return {
                ok: true,
                msg: 'Correo Enviado con exito!!!',
                result: info
            }
    } 
    catch (error) {
        return {
            ok: false,
            msg: 'Correo no enviado',
            result: error
        }
    }
}

async function sendMailSolicitud(mailSenders, copyMailSenders, hiddenMailSenders, subject, body) {
    //console.log(mailSenders);

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        secure: true,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_SOLICITUD,
          pass: process.env.MAIL_SOLICITUD_PWD,
        },
      });

    try {
            // Configure mail
            const mail = {
                from: 'Sicotyc <' + process.env.MAIL_SOLICITUD + '>',
                to: mailSenders.join(','),
                cc: copyMailSenders ? copyMailSenders.join(',') : null,
                bcc: hiddenMailSenders ? hiddenMailSenders.join(',') : null,
                subject,
                html: body
            };
            
            // send mail
            const info = await transporter.sendMail(mail);
            return {
                ok: true,
                msg: 'Correo Enviado con exito!!!',
                result: info
            }
    } 
    catch (error) {
        return {
            ok: false,
            msg: 'Correo no enviado',
            result: error
        }
    }
}

module.exports = {
    sendMailContacto,
    sendMailSolicitud
}
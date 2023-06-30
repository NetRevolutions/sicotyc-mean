const { response }      = require('express');
const User              = require('../models/user');
const Mail              = require('../helpers/mail');

/**
 * Aca se va colocando todos los tipos de correos que se necesitan enviar al usuario o en general
 */

const mailRegisterUser = async(req, res = response ) => {
    
    const { ...fields } = req.body;

    let mailSenders = [fields.email];
    let copyMailSenders = fields.copyMailSenders ? [fields.copyMailSenders] : null;
    let hiddenMailSenders = fields.hiddenMailSenders ? [fields.hiddenMailSenders] : null; 

    let subject = `Hola ${ fields.firstName }... Bienvenido a SICOTYC!!!`;
    let body = `<b>Estimado ${ fields.firstName } ${ fields.lastName }</b>
                <br>
                Ante todo te felicito por escoger esta herramienta como apoyo para captar potenciales clientes
                y darles un mejor servicio en el seguimiento de sus cargas.
                <br>
                Con esta herramienta podras hacer lo siguiente:
                <ul>
                <li>Recibir solicitud de servcios de potenciales clientes (registrados y no registrados)</li>
                <li>Crear y/o reutilizar un tarifario por zonas, tipo de servicio, por cliente y muchas formas mas</li>
                <li>Tener un registro de tus unidades y poder asignarlas rapidamente</li>
                <li>Tu cliente podra tener un enlace donde podra ver la cantidad de servicios brindados por ti</li>
                <li>...muchas pero muchas cosas mas!!!</li>
                </ul>
                <br>
                Para cualquier duda y/o sugerencia agradeceremos nos puedes escribir a <a href="mailto:contacto@sicotyc.com">contacto@sicotyc.com</a>
                <p style='text-align: right'><i>Atte.</i></p>
                <p style='text-align: right'><b><i>Equipo SICOTYC</i></b></p>
                `;
    try {

        //console.log('fields', fields);

        Mail.sendMailContacto(mailSenders, copyMailSenders, hiddenMailSenders, subject, body)
        .then(resp => {
            if (resp.ok) {
                res.json({
                    ok: true,
                    msg: `Felicidades ya tienes acceso a SICOTYC, revisa tu correo para mayor informacion, 
                            si no aparece el correo en su bandeja de entrada recomendamos revisar su bandeja de correo no deseado`
                })
            }
            else {
                //console.log(resp.result);
                res.status(500).json({
                    ok: false,
                    msg: 'Se produjo un error al enviar el correo, contacte al administrador.'
                }); 
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                ok: false,
                msg: 'Se produjo un error al enviar el correo, contacte al administrador.'
            }); 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}

const mailConfirmMail = async( req, res = response ) => {
    const { ...fields } = req.body;  

    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const mailConfirmWorkOrder = async( req, res = response ) => {
    const { ...fields } = req.body;  

    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

module.exports = {
    mailRegisterUser,
    mailConfirmMail,
    mailConfirmWorkOrder
}
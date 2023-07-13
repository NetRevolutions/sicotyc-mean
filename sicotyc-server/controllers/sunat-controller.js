const { response }  = require('express');
const { sunatData } = require('../helpers/sunat');

const getSunatData = async(req, res = response) => {
    const ruc = req.params.ruc;

    try {

        if (!ruc == null || ruc == undefined || ruc == '') {
            return res.status(404).json({
                ok: false,
                msg: 'Nro de RUC es requerido'
            });
        }

        const dataSunat = await sunatData(ruc);

        res.json({
            ok: true,
            dataSunat
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado obteniendo datos de Sunat... revisar logs'
        });
    }
};

module.exports = {
    getSunatData
};

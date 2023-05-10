/**
 * DEPRECADO!!!
 * Ahora la sunat solo permite consultar ruc a traves de un token
 * Por ahora este helper estara en stand-by hasta que se encuentre una manera de obtener la data desde sunat sin uso de token
 * Otras alternativas:
 * Consultar Padron Reducido de SUNAT - se debe de revisar y analizar el siguiente codigo:
 * https://github.com/badcode256/proy-consulta-ruc
 * 
 */

/**
 * Ejemplo basado en la siguiente fuente: (actualmente deprecado)
 * https://gist.github.com/juanpablocs/1d2a2246237c21b2d2533346a4dab0a9
 * 
 * Fuente de algunos metodos aun pendiente de implementar:
 * https://es.stackoverflow.com/questions/42957/c%C3%B3mo-validar-un-ruc-de-per%C3%BA
 */


const request = require('request').defaults({jar: true});
const cheerio = require('cheerio');

const clean   = str => str.replace(/\s+/g, ' ');
const urlCode = 'https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsmulruc/captcha?accion=random';
const urlPost = 'https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias';

const sunatData = ( ruc ) => {
    let promise1 = new Promise((resolve, reject) => {
        request( urlCode, (err, res, code) => {
            const formData = {
                accion: 'consPorRuc',
                nroRuc: ruc,                
                numRnd: code,
                contexto: 'ti-it',
                modo: '1',
                rbtnTipo: '1',
                search1: ruc,
                tipdoc: '1',
                actReturn: '1'
            };

            if (err) {
                console.log(err);
                reject( 'No se pudo consultar la url para obtener el codigo');
            } else {
                resolve({                    
                    formData
                });            
            }            
        });        
    });
    

    return promise1.then(result =>{
        return new Promise((resolve, reject) => {
            request.post({ url: urlPost, form: result.formData}, (err, response, body) => {
                if ( !err && response.statusCode == 200) {
                    const $ = cheerio.load( body );
                    const $table = $(".form-table").eq(2);
                    const htmlData = '';
                    $table.find('tr').each((i, el) => {
                        const a = $(el).find('td[colspan=1]');
                        const b = $(el).find('td[colspan=3]');
                        //console.log(clean(a.text()),'...', clean(b.text()));
                        htmlData += clean(a.text()) + '...' + clean(b.text());
                       
                    });

                    resolve({
                        //ruc,
                        //statusCode: response.statusCode,
                        formData: result.formData,
                        //body,
                        //htmlData,
                        response
                    });
                } else {
                    console.log(err);
                    reject( 'No se pudo obtener los datos de Sunat' );
                }
            });
            //resolve(result.formData);
        });

    }, error => {
        console.log('Se produjo un error en la 2da promesa');
    });    
};

const valRuc = (valor) => {
    let resto = 0;
    let suma = 0;
    let digito = 0;
    valor = trim(valor);
    if ( esnumero( valor )) {
        if ( valor.length == 8) {
            suma = 0;
            for ( let i = 0; i < valor.length - i; i++ ) {
                digito = valor.charAt(i) - '0';
                if ( i == 0) suma += ( digito * 2);
                else suma += ( digito*(valor.length-i));                
            }
            resto = suma % 11;
            if ( resto == 1) resto == 11;
            if ( resto + ( valor.charAt( valor.length-1 ) - '0' ) == 11) {
                return true;
            }            
        } else if ( valor.length == 11 ) {
            suma = 0;
            let x = 6;
            for (let i = 0; i < valor.length - 1; i++) {
                if ( i == 4 ) x = 8;
                digito = valor.charAt(i) - '0';
                x--;
                if ( i == 0 ) suma += (digito*x);
                else suma += (digito*x);
            }
            resto = suma % 11;
            resto = 11 - resto;

            if ( resto >= 10 ) resto - 10;
            if ( resto == valor.charAt( valor.length - 1 ) - '0' ) {
                return true;
            }
        }
    }

}

function trim(cadena){
    cadena2 = "";
    len = cadena.length;
    for ( var i=0; i <= len ; i++ )
      if (cadena.charAt(i) != " "){
        cadena2+=cadena.charAt(i);
      }
    return cadena2;
  }
  function esnumero(campo){
    return (!(isNaN( campo )));
  }

module.exports = {
    sunatData
}

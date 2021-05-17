const express = require('express');
const router = express.Router();
const passport = require('passport');
var fs = require('fs'); // Para Directorios "Manejo de Archivos"
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth'); //Tengo ubicar este módulo en todos los lugares donde quiero proteger
const { isNotLoggedIn } = require('../lib/auth'); //Tengo ubicar este módulo en todos los lugares donde quiero proteger
const { localeData } = require('moment');
//const { on } = require('../database');
const moment = require('moment');

var fs = require('fs');
const mime = require('mime');// Para compilar y descomprimir imagenes de base 64 de la foto de perfil
require('colors');

router.post('/pruebauser', async (request,response)=>{
    //console.log(request.body);

    const {datonombre} = request.body
    const consulta = await pool.query('SELECT id FROM perfilusuario WHERE nombreuser = ?',[datonombre]);
    if (consulta == ''){
        respu = 'El Usuario no existe. Puedes registrarte';
        estado = 'Correcto'
    }
    else{
        respu = 'El usuario existe. NO puedes registrarte';
        estado = 'Incorrecto'
    }
    response.json({
        status : estado,
        resp : respu
    });
});

// ********************************  La ruta fetch para la imagen de perfil ******************************************

router.post('/subeimgperfil', async (request,response)=>{
    console.log('LLegaste a la ruta fetch'.yellow)
    console.log(request.body.URLactual)
    const usuario = request.body.URLactual.split('=')[1];

    response2 = {};
    console.log('El tipo'.cyan)
    console.log(request.body.contentType)
    response2.type = request.body.contentType; //[contentType,...]
    response2.data = new Buffer.from(request.body.realData, 'base64'); // [...,realData,..]
    let decodedImg = response2;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime.extension(type);
    const fecha = moment().format('YYYYMMDD');
    console.log('las fechas'.green)
    console.log(fecha)
    let fileName =  usuario + '-' + fecha + '.' + extension; //here the name
    console.log(fileName)
    await pool.query('UPDATE perfilusuario SET imagen = ? WHERE nombreuser = ?', [fileName,usuario]); 
    try {
        fs.writeFileSync("./servidor/public/usuarios/"+ usuario + "/" + fileName, imageBuffer, 'utf8');
        mensaje = 'correcto'
    } 
    catch (e) {
        console.log(e)
        mensaje = 'incorrecto'
    }
    response.json({status : mensaje});
});




// ******************************** Aquí terminaron todas las Rutas ***************************************
module.exports = router;
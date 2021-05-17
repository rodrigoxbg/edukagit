// :::::::::::::::::: Absolutamente todo esto es nuevo ---> oo
// Diferentes funciones
const encriptacion = require('bcryptjs');
const helpers = {};

// Modulo para el registrado

helpers.cifrarcontraseña = async (password)=>{
    const salt = await encriptacion.genSalt(10); //Ejecuto la encriptación 10 veces para que no ocupe mucho tiempo
    const datocifrado = await encriptacion.hash(password, salt);
    return datocifrado;
};

// Módulo para el logeo osea comparación

helpers.comparapassword = async (password, savePassword) =>{
    try{
        return await encriptacion.compare(password, savePassword);
    } catch(e){
        console.log(e);
    }

};

module.exports = helpers;
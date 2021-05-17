const express = require('express');
const router = express.Router();
const passport = require('passport');
var fs = require('fs'); //Para funciones de sistemas
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth'); //Tengo ubicar este módulo en todos los lugares donde quiero proteger
const { isNotLoggedIn } = require('../lib/auth'); //Tengo ubicar este módulo en todos los lugares donde quiero proteger
require('colors');
const moment = require('moment')
const os = require('os');

router.get('/sudousuarios',isLoggedIn,async (req,res)=>{ //-->oo
    const datopagina = await pool.query('SELECT * FROM paginaconf');
    const usuarios = await pool.query('SELECT * FROM perfilusuario ORDER BY id DESC')
    res.render('sudo/usuarioslist',{lapagina: datopagina[0], usuarios});
});

router.get('/activaperfil=:elid',isLoggedIn,async (req,res)=>{ //-->oo
    const {elid} = req.params;
    rol = 'Usuario';
    usuario = '1';
    const activa = {rol,usuario};
    await pool.query('UPDATE perfilusuario set ? WHERE id = ?',[activa,elid]);
    req.flash('smsok', 'El perfil de usuario ha sido activado')
    res.redirect('/sudousuarios');
});


// ****************************** Páginas de administración de Perfiles ***********************************//

router.get('/superfil=:elidperfil',isLoggedIn,async (req,res)=>{ //-->oo
    const {elidperfil} = req.params;
    const datopagina = await pool.query('SELECT * FROM paginaconf');
    const usuarios = await pool.query('SELECT * FROM perfilusuario WHERE id =?',[elidperfil])
    res.render('paginas/perfiles/ajeno.hbs',{lapagina: datopagina[0], perfil: usuarios[0]});
});

router.post('/sudoeliminauser',isLoggedIn, async (req,res)=>{
    if (req.body.codigosudo == 'abc123+-'){
        await pool.query('DELETE FROM perfilusuario WHERE id = ?',[req.body.idusuario])
        await pool.query('DELETE FROM suministros WHERE id = ?',[req.body.idusuario])
        req.flash('smsok','El usuario ha sido eliminado Correctamente...')
        res.redirect('/sudousuarios')
    }
    else{
        req.flash('smserror','No se ha podido eliminar al usuario')
        res.redirect('/sudousuarios')
    }
});

router.post('/sudoeditajeno=:idperf',isLoggedIn, async (req,res)=>{
        const {idperf} = req.params;
        await pool.query('UPDATE perfilusuario SET ? WHERE id = ?',[req.body, idperf])
        req.flash('smsok','El usuario ha sido editado Correctamente...')
        res.redirect('/superfil=' + idperf)
});

// ******************************** Aquí terminaron todas las Rutas ***************************************
module.exports = router;
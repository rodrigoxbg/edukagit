const express = require('express');
const router = express.Router();
const passport = require('passport');
var fs = require('fs'); // Para Directorios "Manejo de Archivos"
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth'); //Tengo ubicar este módulo en todos los lugares donde quiero proteger
const { isNotLoggedIn } = require('../lib/auth'); //Tengo ubicar este módulo en todos los lugares donde quiero proteger
const { localeData } = require('moment');
//const { on } = require('../database');
require('colors');
const moment = require('moment')

// ********************************  Aquí irán todas las rutas ******************************************

// --- ///-/-/-/-/-/-/ Rutas para el diseño ///-/-/-/-/-/-/-
/*
router.get('/admin',isNotLoggedIn,async (req,res)=>{ //-->oo
    //const datopagina= await pool.query('SELECT * FROM paginaconf');
    //res.render('administracion',{lapagina: datopagina[0]});
});

router.post('/admin', async (req,res)=>{ //-->oo
    //req.flash('smsok', 'La información del pagina, ha sido actualizada....')
    //res.redirect('/');
});*/

// Rutas dedicadas al perfil ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

router.get('/perfil/:usuario',isLoggedIn,async (req,res)=>{ //-->oo
    const {usuario} = req.params;
    const elusuario = await pool.query('SELECT * FROM perfilusuario WHERE nombreuser = ?',[usuario])
    //const idthema = await pool.query('SELECT id,mitheme FROM perfilusuario WHERE nombreuser = ?',[usuario]);
    //const damethema= await pool.query('SELECT * FROM themaspag WHERE id = ?',[idthema[0].mitheme]);

    const datopagina= await pool.query('SELECT * FROM paginaconf');
    res.render('perfil',{lapagina: datopagina[0]});
});


// ::::::::::::::::::: RElacionado con edicion el Perfil ::::::::::::::::::::::::::::::::::::

router.get('/editamiperfil=:user',isLoggedIn,async (req,res)=>{ //-->oo
    const {user} = req.params;
    const datopagina = await pool.query('SELECT * FROM paginaconf');
    res.render('paginas/perfiles/editaperfil',{lapagina: datopagina[0]});
});

router.post('/editamiperfil=:user',isLoggedIn, async (req,res)=>{ //-->oo
    const {user} = req.params;
    console.log('Me acaba de llegar esto....'.bgGreen)
    console.log(req.body)
    await pool.query('UPDATE perfilusuario set ? WHERE nombreuser = ?',[req.body,user]);
    req.flash('smsok', 'Tu usuario fué actualizado correctamente...')
    res.redirect('/perfil/'+user);
});

router.get('/editaimagen=:user',isLoggedIn,async (req,res)=>{ //-->oo
    const {user} = req.params;
    const datopagina = await pool.query('SELECT * FROM paginaconf');
    res.render('paginas/perfiles/editarimg',{lapagina: datopagina[0]});
});


// ******************************** Aquí terminaron todas las Rutas ***************************************
module.exports = router;
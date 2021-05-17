const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth') //Tengo ubicar este módulo en todos los lugares donde quiero proteger
const { isNotLoggedIn } = require('../lib/auth') //Tengo ubicar este módulo en todos los lugares donde quiero proteger

const pool = require('../database');
require('colors');

router.get('/registro',isNotLoggedIn, async(req,res)=>{ //Esta ruta es para renderizar el formulario
    const datopagina= await pool.query('SELECT * FROM paginaconf');
    res.render('auth/registro',{lapagina: datopagina[0]});
});

router.post('/registro', passport.authenticate('local.signup',{
    successRedirect:'/',
    failureRedirect: '/registro',
    failureFlash: true
}));

router.get('/ingresar',isNotLoggedIn,(req, res)=>{
    res.redirect('auth/ingreso');
    /*res.render('auth/ingreso');*/
});

router.post('/ingresar',isNotLoggedIn,(req,res, next)=>{
    passport.authenticate('local.signin', {
        successRedirect: '/',
        failureRedirect: '/registro',
        failureFlash: true
    })(req,res,next);
});

router.get('/panel', async (req,res)=>{ //Se ha agregado el isLoggedIn para proteger la ruta en caso no esté logeado el user
    const datopagina= await pool.query('SELECT * FROM paginaconf');
    res.render('panel',{lapagina: datopagina[0]});
    //res.send('Esta será la página para tu perfil')
});

router.get('/cerrarsesion',(req,res)=>{
    req.logOut();
    res.redirect('/');
});

module.exports = router;
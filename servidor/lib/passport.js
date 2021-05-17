// 222222222222222222222222222     Absolutamente todo esto es nuevo -->oo    2222222222222222222222222222222222

//Aqui vamos a definir nuestros métodos de autentificación, también permite autentificación con redes sociales
var fs = require('fs'); // Para Directorios "Manejo de Archivos"
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
//const helpers = require('../lib/helpers'); //importo la contraseña cifrada
const helpers = require('./helpers'); //importo la contraseña cifrada
// Al tener los dos módulos anteriores ya puedo generar mis propias autentificaciones.
const colors = require('colors');
////////00000000000000000000/////////////////////000000000000000000/////////////////////////00000000000000000/////////////////00000000///000/0/0/0/0//00/
passport.use('local.signin', new LocalStrategy({
    usernameField: 'nombreuser',
    passwordField: 'password',
    passReqToCallback: true
},async (req, nombreuser, password, done)=>{
    //console.log(req.body);
    //console.log(username.green);
    //console.log(password.green);
    const rows = await pool.query('SELECT * FROM perfilusuario WHERE nombreuser = ?',[nombreuser]); //quiero q me traiga todos los usuarios q coincidad con username
    if (rows.length >0){
        const user = rows[0];
        const confirmapass = await helpers.comparapassword(password, user.password);
        if (confirmapass){
            done(null, user, req.flash('smsloginok',user.Nombre));
            //done(null, user, req.flash('smsok','Bienvenido '+ user.Nombre));
        } else {
            done(null, false, req.flash('smserror','Credenciales inválidas'));
        }
    } else {
        return done(null, false, req.flash('smserror','EL nombre de usuario no está registrado en nuestras bases'));
    }
}));
////////00000000000000000000/////////////////////000000000000000000/////////////////////////00000000000000000/////////////////00000000///000/0/0/0/0//00/

passport.use('local.signup', new LocalStrategy({
    usernameField: 'nombreuser', //'username',//
    passwordField: 'password',
    passReqToCallback: true
},async (req,nombreuser,password,done)=>{
    //console.log(req.body); // Ya sabemos que aquí están los usuarios nuevos
    const {Nombre, correo, ipusuario}= req.body;
    datoid = await pool.query('SELECT id FROM perfilusuario WHERE nombreuser = ?',[nombreuser]);
    datocorreo = await pool.query('SELECT id FROM perfilusuario WHERE correo = ?',[correo]);

    if(datoid[0] || datocorreo[0]){
        //console.log('EL nombre de usuario SI existe'.green)
        req.flash('smserror','Algo ha fallado, El usuario que ingresaste ya tiene una cuenta en nuestro sistema...');
    }
    else{
        //console.log('El nombre de usuario NO existe....'.green)
        const nuevoUsuario = { //Esto es solo para definirlo, luego a la base de datos le doy este objeto para q lo almacene
            Nombre,
            correo,
            password,
            nombreuser,
            ipusuario
        };
        nuevoUsuario.password = await helpers.cifrarcontraseña(password);
        const resultado = await pool.query('INSERT INTO perfilusuario SET ?',[nuevoUsuario]);
        //await pool.query('INSERT INTO suministros (chips,energia,tickets,veloe) VALUES (0,0,0,0.001)');
        fs.mkdirSync('servidor/public/usuarios/'+ nombreuser)
        //console.log('Se Ha creado la carpeta con el nombre'.bgGreen + nombreuser)
        //req.flash('smsok', 'Excelente, bienvenido nuevo usuario.')
        req.flash('smsusernewok', Nombre)
    }
    return done(null);
}));

////////00000000000000000000/////////////////////000000000000000000/////////////////////////00000000000000000/////////////////00000000///000/0/0/0/0//00/
passport.serializeUser((user,done)=>{
    done(null, user.id);
});

passport.deserializeUser(async (id, done)=>{
    /* rows = await pool.query('SELECT * FROM perfilusuario WHERE ID =?',[id]);
    /* const rows2 = await pool.query('SELECT * FROM perfilusuario WHERE ID =?',[id]);
    const rowid= rows2[0].id; 
    const monedero = await pool.query('SELECT * FROM suministros WHERE id = ?',[rowid]); // para entrar a la tabala de suministros
    const user2 = rows2[0];
    const monederocont = monedero[0];
    const rows = Object.assign(user2,monederocont);//se agrega al objeto del perfil con el de suministros */
    /*done(null,rows);*/
    
    const rows = await pool.query('SELECT * FROM perfilusuario WHERE ID =?',[id]);
    done(null,rows[0]);
});
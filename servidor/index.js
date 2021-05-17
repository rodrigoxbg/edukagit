//--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo
const express = require('express');
const morgan = require('morgan') // Nos permite mostrar por consola las peticiones
const exphbs = require('express-handlebars'); // Handlebars es una librería que permite particionar una página web en módulos
const path = require('path'); //Empaqueta cosas y nos da las extensiones del Handlebars
//--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo--oo
const flash = require('connect-flash'); // --> 00 // Este módulo permite enviar mensajes flash
const session = require('express-session'); // --> 00
const validator = require('express-validator'); //-->00
const mysqlstore= require('express-mysql-session')(session); // --> 00
const bodyParser = require('body-parser');//-->00
const {database} = require('./keys'); // --> 00
const passport = require('passport'); //--> 00
const http = require('http');
//const pool = require('./database');  // esto es los datos de la base de datos 03/06/2020 11:52
// --oo--oo--oo--oo--oo--oo--oo CODIGO DE Socket io --oo-oo--oo--oo--oo--oo--oo--oo--oo--oo--oo
const socketIO = require('socket.io'); // Para comunicación del servidor con el cliente
const app = express();
require('./lib/passport');

const server = http.createServer(app); 
const io = socketIO.listen(server); //--> Agregado el 09/07/20 

//-->
server.listen(4040,function(){
    console.log('Servidor Activado en el puerto: 4040'.brightGreen)
});

/* 
________________________________________________________________________________________________________________
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::::::::::::::::..... Activación de Servidor ..... :::::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
________________________________________________________________________________________________________________
*/
app.set('port',process.env.PORT || 4040);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.set('views'),'layouts'),
    partialsDir: path.join(app.set('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine','.hbs');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//app.use(bodyParser.json({limit: "50mb"}));
//app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(session({  // VAmos a almacenar la sesión en la base de datos
    secret: 'Sesionparamysql', 
    resave: false,
    saveUninitialized: false,
    store: new mysqlstore(database)
})); //-->oo

/* 
________________________________________________________________________________________________________________
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::::::::::::::::::::::::::::::::::::::::-....... Sección de Middlewares . ..... :::::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
________________________________________________________________________________________________________________
*/


app.use(passport.initialize());//-->oo
app.use(passport.session());//-->oo
app.use(flash()); //-->oo // Hemos activado la posibilidad de enviar mensajes 00001
app.use((req,res,next)=>{ //-->oo
    app.locals.smsusernewok = req.flash('smsusernewok');
    app.locals.smsloginok = req.flash('smsloginok');
    app.locals.smsok = req.flash('smsok'); //Voy a tomar el mensaje de guardado exitoso y lo haré disponible en todas las vistas 00002
    app.locals.smserror = req.flash('smserror');
    app.locals.user = req.user; // Con esto mi variable users, puede ser accedida desde cualquier <--- Esto de fila 0 lo agregé, desde el 14/05/2021 me late que es un error
    next();
}); //-->oo

// ----------------------------7-77-7-7-7-7-7-7- Aquí van las rutas del servidor ---77-7-7-7-7-7-7-7----7777---777--
app.use(require('./direcciones'));
app.use(require('./direcciones/rutasfetch')); //-->oo
app.use(require('./direcciones/rutasadmin')); //-->oo

app.use(require('./direcciones/misrutas'));
// Rutas: Las urls de nuestro servidor.

app.use(require('./direcciones/autentificacion')); //-->oo
//app.use('/variables',require('./direcciones/variables')); //-->oo
// -------------------------------------------- Globales -->oo----------------------------------------

app.use(express.static(path.join(__dirname,'public')));
//

// Hey aprendí a usar el commit
//yo tambien XD
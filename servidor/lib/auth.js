module.exports = {
    isLoggedIn(req,res,next){
        if(req.isAuthenticated()){ //me devuelve un true si la sesion del usuario existe
            return next();
        }
        return res.redirect('/registro'); // Si no está logeado q nos lleve a Registrarse.
        //return res.redirect('/ingresar');
    },
    isNotLoggedIn(req,res,next){ //Me devuelve true si el usuario no está logeado.con esto puedo evitar rutas repetitivas
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/');
        //return res.redirect('/perfil');
    }
};

// Como ya está creado este modulo, lo unico que nos falta es importarlo desde la ruta donde queremos proteger
const express = require('express');
const router = express.Router();
const pool = require('../database');
require('colors');

router.get('/',async (req,res)=>{ //-->oo
    const datopagina= await pool.query('SELECT * FROM paginaconf');
    res.render('index',{lapagina: datopagina[0]});
    //res.render('index')
});

module.exports = router;


const mysql = require('mysql');
const { promisify }= require('util');
const { database } = require('./keys');
const pool = mysql.createPool(database);


/////////////////////////////////////////////////////////////////////////////////////////////;
////////////////////////////////////////////////////////////////////////////////////////////;
//  var m=0;  
  pool.getConnection((err, connection) => {
      if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('La conexión con la base de datos se ha perdido...');
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Hay muchas conexiones a la base de datos.');
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('NO se ha podido establecer conexión con la base de datos'.bgMagenta);
      }
      if (err.code === 'EADDRINUSE'){
        console.error('El puerto actualmente está ocupado....');
      }
    }
    if (connection) {
      connection.release();
      console.log('La conexión con la base de datos ha sido exitosa....'.brightGreen);
    }
    return;
  });

/////////////////////////////////////////////////////////////////////////////////////////////;
////////////////////////////////////////////////////////////////////////////////////////////;
// Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;
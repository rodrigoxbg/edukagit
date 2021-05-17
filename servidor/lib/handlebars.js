/* Vamos a ver como va a funcionar la biblioteca timeago de la dependencia */
const {format} = require('timeago.js')

const helpers={};

helpers.timeago = (timestamp) =>{
    return format(timestamp);
}
module.exports = helpers;
const Usuario = require('../models/usuario');
const fs = require('fs')


exports.dato = 'yo'

    Usuario.findOne({role: 'ADMIN_ROLE'}, (err, usuario)=>{
        if(err) throw err

        fs.writeFile('input.txt', `${usuario._id}`)    
    });



    /**
     var idLecturaDeArchivo

    fs.readFile('input.txt', (err, data) => {
        if (err) throw err;
        console.log("La data seria... "+data);
        idLecturaDeArchivo = data.toString()
        console.log(idLecturaDeArchivo);
        });


    console.log("Y este es el id recogido... upa: "+idLecturaDeArchivo)    

    return idLecturaDeArchivo;
     */




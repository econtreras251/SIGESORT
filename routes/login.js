var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

var app = express();
var Usuario = require('../models/usuario');

var mdAutenticacion = require('../middlewares/autenticacion');

// ==========================================
//  Autenticación normal
// ==========================================
app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }

        // Crear un token!!!
        usuarioDB.password = ':)';

        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }); // 4 horas

        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id,
            menu: obtenerMenu(usuarioDB.role)
        });

    })


});


/////// Modificar esta función para obtener distintos menus ////////
function obtenerMenu(ROLE) {

    var menu = [
        {
            titulo: 'Principal',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Dashboard', url: '/dashboard' },
                { titulo: 'ProgressBar', url: '/progress' },
                { titulo: 'Gráficas', url: '/graficas1' },
                { titulo: 'Promesas', url: '/promesas' },
                { titulo: 'RxJs', url: '/rxjs' }
            ]
        },
        {
            titulo: 'Mantenimientos',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                // { titulo: 'Usuarios', url: '/usuarios' },
                { titulo: 'Hospitales', url: '/hospitales' },
                { titulo: 'Médicos', url: '/medicos' }
            ]
        }
    ];

    console.log('ROLE', ROLE);

    if (ROLE === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: '/usuarios' });
    }


    return menu;

}



module.exports = app;
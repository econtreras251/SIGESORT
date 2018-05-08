const express = require('express');
const mdAutenticacion = require('../middlewares/autenticacion');
const app = express();
const Hospital = require('../models/tickets');

// Obtener todos los tickets
app.get('/', (req, res, next)=>{

    Ticket.find()
            .exec(
            ( err, tickets )=>{
  
      if (err) {
          return res.status(500).json({
              ok: false,
              mensaje: 'Error cargando Tickets',
              errors: err
          })
      }
  
      res.status(200).json({
        ok: true,
        tickets: tickets
      })
  
    })
  
  })


// Crear nuevo ticket
app.post('/', mdAuth.verificaToken , ( req, res, next )=>{

    let body = req.body;
    let user = req.usuario._id;
  
    /* aqui irira la consulta del posible sujeto del middleware quizas, algo así asi que hy que ver, igual investigar la transacciones
    Usuario.findOne({role: 'SUPPORT_ROLE'}, (err, usuario)=>{
      if(err) throw err
      
      this.soporteAsignado = usuario._id
    })
    */
    
    
    let ticket = new Ticket({
      titulo: body.titulo,
      descripcion: body.descripcion,
      usuario: req.usuario._id,
      encargado: req.query.id
    })
  
    ticket.save( ( err, ticketGuardado )=>{
  
      if (err) {
          return res.status(400).json({
              ok: false,
              mensaje: 'Error al crear ticket',
              errors: err
          })
      }
  
      res.status(201).json({
        ok: true,
        ticket: ticketGuardado,
        usuario_peticion: req.usuario,
        soporte_asignado: req.query.id
      })
  
    })
  
  })
  
  module.exports = app
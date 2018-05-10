const express = require('express');
const mdAutenticacion = require('../middlewares/autenticacion');
const mdAsignacion = require('../middlewares/prueba');
const app = express();
const Tickets = require('../models/tickets');

// Obtener todos los tickets
app.get('/', (req, res, next)=>{

    Tickets.find()
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
app.post('/', mdAutenticacion.verificaToken, ( req, res, next )=>{

    let body = req.body;
    let user = req.usuario._id;
    //let encargado = mdAsignacion.dato();
    //setTimeout(() => {
    //  console.log("y el resultado es... ::::::: "+encargado);  
    //}, 5000);  
  
    /* aqui irira la consulta del posible sujeto del middleware quizas, algo así asi que hy que ver, igual investigar la transacciones
    Usuario.findOne({role: 'SUPPORT_ROLE'}, (err, usuario)=>{
      if(err) throw err
      
      this.soporteAsignado = usuario._id
    })
    */
    
    
    let ticket = new Tickets({
      titulo: body.titulo,
      descripcion: body.descripcion,
      usuario: req.usuario._id,
      encargado: 'idid'//encargado
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
        soporte_asignado: encargado
      })
  
    })
  
  })
  
  module.exports = app
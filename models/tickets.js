const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    id_natural: { type: String, required: [true, 'El nombre es necesario'], default: `${shortid.generate()}.${new Date().getMilliseconds()}` },
    descripcion: { type: String, required: [true, 'La descripcion debe tener algo'] },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    encargado: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El id usuario soporte es un campo obligatorio']
    },
    estado: { type: Boolean, default: true }
});


module.exports = mongoose.model('Ticket', ticketSchema);
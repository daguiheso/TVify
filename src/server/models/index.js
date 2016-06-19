import mongoose, { Schema } from 'mongoose'

/* Vote
   showId
   count
*/

/* Definiendo esquema*/
let VoteSchema = new Schema({
  /* columnas*/
  showId: { type: Number, required: true, unique: true },  /* type es el unico obligatorio, y recibe todos los tipos de js y los de mongoose com MixedType para datos mixtos*/
  count: { type: Number, default: 0 }
})

/* Registrando variable en mongoose*/
let model = mongoose.model('Vote', VoteSchema) /* por parametro recibe nombre del modelo (Vote), y esquema definido*/

export default model

// var app = require('express')()  otra manera de declarar
import express from 'express'
const app = express()

import api from '../../src/server/api'

/* app use sirve para registrar middlewares, que son funciones que se ejecutan
   que se ejecutan de forma secuencial cada vez que llega un request
*/

/* establece directorio donde estaran los archivos static*/
app.use(express.static('public')) /* express.static('public') es un middleware y evalua si el request que llega esta pidiendo un static file y una vez haga eso va a cortar la secuencia y no ejecuta el resto de endPoints*/

/* Los middleware lo que hacen es como su nombre lo dice estar en el medio, en el medio del
   request que recibe express y la function en la cual recibo la data. Un middleware basicamente
   es una forma de reutilizar funciones o rutinas de codigo entre distintos endPoints
*/

app.use('/api/votes', (req, res, next) => {
  console.log('middleware 1')
  next()
})

app.use('/api/votes', (req, res, next) => {
  console.log('middleware 2')
  next()
})

/* montar modulo api en /api*/
app.use('/api', api)

app.listen(3000, () => console.log('hola ya corriendo con Express'))

import http from 'http'
// var app = require('express')()  otra manera de declarar
import express from 'express'
import api from '../../src/server/api'
import mongoose from 'mongoose'
import socketio from 'socket.io'
import { incrementVote } from './lib'

const app = express()
/* creando servidor y como argumento la app de express*/
const server = http.createServer(app)
/* crear o instanciar el soketio dentro del servidor http y de esta manera ya
   asociamos tanto la app de express como la app de socketio a nuestro servidor
*/
const io = socketio(server)
const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/tvify')

/* app use sirve para registrar middlewares, que son funciones que se ejecutan
   que se ejecutan de forma secuencial cada vez que llega un request
*/

/* establece directorio donde estaran los archivos static*/
app.use(express.static('public')) /* express.static('public') es un middleware y evalua si el request que llega esta pidiendo un static file y una vez haga eso va a cortar la secuencia y no ejecuta el resto de endPoints*/

/* montar modulo api en /api*/
app.use('/api', api)

/* socketio esta pendiente de eventos y el primero sera las conexiones y una nueva conexion llega
   cuando alguien desde el lado del cliente se conecta utilizando websockets al servidor
*/

/* escuchando por el evento connection y este entrega un socket que seria la persona o cliente que se conecto*/
io.on('connection', (socket) => {
  console.log(`Connected ${socket.id}`)

  socket.on('vote', id => {
    incrementVote(id, (err, vote) => {
      if (err) return socket.emit('vote:error', err)

      io.sockets.emit('vote:done', vote) /* notificando al cliente este cambio*/
    })
  })

  socket.on('message', msg => {
    socket.broadcast.emit('message', msg) /* reenviando a los conectados a este chat*/
  })
})

server.listen(port, () => console.log(`Server listening on port ${port}`))

// var app = require('express')()  otra manera de declarar
import express from 'express'
import api from '../../src/server/api'
import mongoose from 'mongoose'

const app = express()
const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/tvify')

/* app use sirve para registrar middlewares, que son funciones que se ejecutan
   que se ejecutan de forma secuencial cada vez que llega un request
*/

/* establece directorio donde estaran los archivos static*/
app.use(express.static('public')) /* express.static('public') es un middleware y evalua si el request que llega esta pidiendo un static file y una vez haga eso va a cortar la secuencia y no ejecuta el resto de endPoints*/

/* montar modulo api en /api*/
app.use('/api', api)

app.listen(port, () => console.log(`Server listening on port ${port}`))

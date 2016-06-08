// var app = require('express')()  otra manera de declarar
import express from 'express'
const app = express()

const votes = {}

/*app use sirve para registrar middlewares, que son funciones que se ejecutan que se ejecutan de 
forma secuencial cada vez que llega un request */

/*establece directorio donde estaran los archivos static*/
app.use(express.static('public')) /* express.static('public') es un middleware y evalua si el request que llega esta pidiendo un static file y una vez haga eso va a cortar la secuencia y no ejecuta el resto de endPoints*/ 

// GET /votes
app.get('/votes', (req, res) => {
	res.json(votes)
})

// POST /vote/123
app.post('/vote/:id', (req, res) => { /*express lo procesa como un parametro*/
	let id = req.params.id
	if (votes[id] === undefined)
		votes[id] = 1
	else
		votes[id] = votes[id] + 1

	res.json({ votes: votes[id]})
})

app.listen(3000, () => console.log('hola ya corriendo con Express'))
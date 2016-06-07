var fs = require('fs')
var http = require('http')
var assets = require('./assets.js')

var server = http.createServer( (req,res) => {
	switch(req.url) {
		case '/':
			assets.serveStatic('index.html', (err, content) => {
				res.end(content)
			})
			break
		case '/app.js':
			assets.serveStatic('app.js', (err, content) => {
				res.end(content)
			})
			break
		case '/app.css':
			assets.serveStatic('app.css', (err, content) => {
				res.end(content)
			})
			break
		default:
			res.statusCode = 404
			res.end('Not Found')
			break
	}
})

server.listen(3000, () => {
	console.log('hola ya corriendo')
})
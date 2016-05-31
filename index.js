var fs = require('fs')
var http = require('http')

fs.readFile('./public/index.html', function (err, data) {
	console.log(data.toString().length)
})

console.log('Hola amigos')

var server = http.createServer(function (req,res) {
	switch(req.url) {
		case '/':
			fs.readFile('./public/index.html', function (err, data) {
				res.end(data.toString())
			})
			break
		case '/app.js':
			fs.readFile('./public/app.js', function (err, data) {
				res.end(data.toString())
			})
			break
		case '/app.css':
			fs.readFile('./public/app.css', function (err, data) {
				res.end(data.toString())
			})
			break
		default:
			res.end('')
			break
	}
})

server.listen(3000, function () {
	console.log('hola ya corriendo')
})
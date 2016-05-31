var fs = require('fs')
var http = require('http')

function serveStatic (name, callback) {
	fs.readFile('./public/' + name, function (err, data) {
		if (err) {
			return callback(err)
		}
		callback(err, data.toString())
	})
}

var server = http.createServer(function (req,res) {
	switch(req.url) {
		case '/':
			serveStatic('index.html', function (err, content) {
				res.end(content)
			})
			break
		case '/app.js':
			serveStatic('app.js', function (err, content) {
				res.end(content)
			})
			break
		case '/app.css':
			serveStatic('app.css', function (err, content) {
				res.end(content)
			})
			break
		default:
			res.statusCode = 404
			res.end('Not Found')
			break
	}
})

server.listen(3000, function () {
	console.log('hola ya corriendo')
})
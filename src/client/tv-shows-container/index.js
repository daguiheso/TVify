import $ from 'jquery'
import socketio from 'socket.io-client'

/* conectar a servidor - esto se va a conectar automaticamente al servidor
   desde donde estamos ejecutando la app, pero si la conexion fuera a otro
   servidor habria que pasar la ruta, ip o host
*/
let socket = socketio()

/* recibir o escuchar evento, cuando lo recibe ejecuta una function*/
// socket.on('pong', function () {
//   console.log('PONG')
// })

var $tvShowsContainer = $('#app-body').find('.tv-shows')

$tvShowsContainer.on('click', 'button.like', function (ev) {
  var $this = $(this)
  var $article = $this.closest('.tv-show') /* closets function de jquery que busca elemento o tag padre que cumpla condicion*/
  var id = $article.data('id') // data-id button

  /* enviar o emitir evento al servidor y argumento id para saber por quien voto*/
  socket.emit('vote', id)
  $article.toggleClass('liked')
})

export default $tvShowsContainer

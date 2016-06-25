import $ from 'jquery'
import socketio from 'socket.io-client'

/* conectar a servidor - esto se va a conectar automaticamente al servidor
   desde donde estamos ejecutando la app, pero si la conexion fuera a otro
   servidor habria que pasar la ruta, ip o host
*/
let socket = socketio()

var $tvShowsContainer = $('#app-body').find('.tv-shows')

// Click like show
$tvShowsContainer.on('click', 'button.like', function (ev) {
  var $this = $(this)
  var $article = $this.closest('.tv-show') /* closets function de jquery que busca elemento o tag padre que cumpla condicion*/
  var id = $article.data('id') // data-id button

  /* enviar o emitir evento al servidor y argumento id para saber por quien voto*/
  socket.emit('vote', id)
  $article.toggleClass('liked')
})

/* escuchando evento vote:done que recibe un voto y vote tiene el numero de votos del show*/
socket.on('vote:done', vote => {
  let id = vote.showId
  /* obtener elemento article por id*/
  let $article = $tvShowsContainer.find('article[data-id=' + id + ']')
  let counter = $article.find('.count')
  /* actualizando count en el html*/
  counter.html(vote.count)
})

export default $tvShowsContainer

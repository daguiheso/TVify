import $ from 'jquery'
import page from 'page'
import socketio from 'socket.io-client'

/* conectar a servidor - esto se va a conectar automaticamente al servidor
   desde donde estamos ejecutando la app, pero si la conexion fuera a otro
   servidor habria que pasar la ruta, ip o host
*/
let socket = socketio()

let $tvShowsContainer = $('#app-body').find('.tv-shows')

// Click like show
$tvShowsContainer.on('click', 'button.like', function (ev) {
  let $this = $(this)
  let $article = $this.closest('.tv-show') /* closets function de jquery que busca elemento o tag padre que cumpla condicion*/
  let id = $article.data('id') // data-id article

  /* enviar o emitir evento al servidor y argumento id para saber por quien voto*/
  socket.emit('vote', id)
  $article.toggleClass('liked')
})

// Click chat btn
$tvShowsContainer.on('click', 'button.chat', function (ev) {
  let $this = $(this)
  let $article = $this.closest('.tv-show')
  let id = $article.data('id') // data-id article

  page('/chat/' + id)
})

// Enabled input chat
$tvShowsContainer.on('keypress', '.chat-nick', function (ev) {
  let $this = $(this)
  let $chatInput = $('.chat-input')

  $chatInput.prop('disabled', $this.val().length === 0)
})

// Message enter and
$tvShowsContainer.on('keypress', '.chat-input', function (ev) {
  let $this = $(this)
  let nick = $('.chat-nick').val()

  if (ev.which === 13) {
    let message = $this.val()

    // { nick:nick, message: message }
    socket.emit('message', { nick, message }) /* forma es6 llave:valor se obvia*/
    addMessage(nick, message) /* Añadir message a la interfaz ya que es mi propio mensaje - broadcast*/

    $this.val('')
  }
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

socket.on('message', msg => {
  /* object destructuring - asignación por destructuring*/
  let { nick, message } = msg
  addMessage(nick, message) /* Añadir message a la interfaz */
})

// Añadir message a la interfaz
function addMessage (nick, message) {
  let $chatBody = $('.chat-body')
  $chatBody.append(`<p><b>${nick}:</b> ${message}</p>`)
}

export default $tvShowsContainer

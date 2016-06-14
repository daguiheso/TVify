import $ from 'jquery';

var $tvShowsContainer = $('#app-body').find('.tv-shows');

$tvShowsContainer.on('click', 'button.like', function (ev) {
	var $this = $(this);
	var $article = $this.closest('.tv-show')  /*closets function de jquery que busca elemento o tag padre que cumpla condicion*/
	var id = $article.data('id') // data-id button
	$.post('/api/vote/' + id, function () {
		var counter = $this.closest('article').find('.count') /*busca la clase count que este mas cercana al $this (boton)*/
		var content = counter.html() /*contenido html de counter*/
		var count = Number(content)  /*convirtiendo content en numero*/
		count = count + 1;
		counter.html(count) /*cambiando valor de count en html*/
		$this.animate({
			'fontSize': '30px'
		}, 'fast')
		
		$article.toggleClass('liked')
	})
})

export default $tvShowsContainer
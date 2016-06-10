import $ from 'jquery';

var $tvShowsContainer = $('#app-body').find('.tv-shows');

$tvShowsContainer.on('click', 'button.like', function (ev) {
	var $this = $(this);
	var $article = $this.closest('.tv-show')  /*closets function de jquery que busca elemento o tag padre que cumpla condicion*/
	var id = $article.data('id') // data-id button
	$.post('/api/vote/' + id, function () {
		
		$this.animate({
			'fontSize': '30px'
		}, 'fast')
		
		$article.toggleClass('liked')
	})
})

export default $tvShowsContainer
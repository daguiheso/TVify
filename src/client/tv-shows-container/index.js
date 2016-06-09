import $ from 'jquery';

var $tvShowsContainer = $('#app-body').find('.tv-shows');

$tvShowsContainer.on('click', 'button.like', function (ev) {
	var $this = $(this);
	var id = $this.data('id') // data-id button
	$.post('/api/vote/' + id, function () {
		
		$this.animate({
			'fontSize': '30px'
		}, 'fast')
		$this.closest('.tv-show')  /*closets function de jquery que busca padre que cumpla condicion*/
			.toggleClass('liked')
	})
})

export default $tvShowsContainer
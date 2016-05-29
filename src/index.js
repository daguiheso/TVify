import $ from 'jquery';

$(function() {

	var $tvShowsContainer = $('#app-body').find('.tv-shows');

	$tvShowsContainer.on('click', 'button.like', function (ev) {
		var $this = $(this);
		$this.animate({
			'fontSize': '30px'
		}, 'fast')
		$this.closest('.tv-show')  /*closets function de jquery que busca padre que cumpla condicion*/
			.toggleClass('liked')
	})

	function renderShows(shows) {
		$tvShowsContainer.find('.loader').remove()
		shows.forEach(function (show) {
			var article = template
				.replace(':name:', show.name)
				.replace(':img:', show.image ? show.image.medium : '')
				.replace(':summary:', show.summary)
				.replace(':img alt:', show.name + "Logo")
			// Convirtiendo en jquery object
			var $article = $(article)
			$tvShowsContainer.append($article)
			$article.hide()
			$article.show('slow')
		})
	}
	/**
	 * Submit search form
	 */
	$('#app-body')
	 	.find('form')
	 	.submit(function (ev) {
	 		ev.preventDefault();
	 		debugger
	 		var query = $(this)
	 			.find('input[type="text"]')
	 			.val();
			$tvShowsContainer.find('.tv-show').remove()
			var $loader = $('<div class="loader"></div>')
			$loader.appendTo($tvShowsContainer)
	 		$.ajax('http://api.tvmaze.com/search/shows', { data: { q: query} })
	 			.then(function (res) {
	 				$loader.remove();
	 				var shows = res.map(function (el) {
	 					return el.show
	 				})
	 				renderShows(shows)
	 			})
		})

	var template = '<article class="tv-show">' +
					'<div class="left img-container">' +
						'<img src=":img:" alt=":img alt:">' +
					'</div>' +
					'<div class="right info">' +
						'<h1>:name:</h1>' +
						'<p>:summary:</p>' +
						'<button class="like">💙</button>' +
					'</div>' +
				'</article>';
	if (!localStorage.shows) {
		$.ajax('http://api.tvmaze.com/shows')
			.then(function (shows) {
				$tvShowsContainer.find('.loader').remove()
				localStorage.shows = JSON.stringify(shows)
				renderShows(shows)
			})
	} else {
		renderShows(JSON.parse(localStorage.shows))
	}
})
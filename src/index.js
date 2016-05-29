import $ from 'jquery';
import page from 'page';
import { getShows } from './tvmaze-api-client';  /*como exportamos 2 funciones entonces utilizamos llaves*/
import renderShows from './render';
import $tvShowsContainer from './tv-shows-container';


page('/', function (ctx, next) {
	if (!localStorage.shows) {
		getShows(function (shows) {
			$tvShowsContainer.find('.loader').remove()
			localStorage.shows = JSON.stringify(shows)
			renderShows(shows)
		})
	} else {
		renderShows(JSON.parse(localStorage.shows))
	}
})

page()
// $(function() {

// 	

// 	$tvShowsContainer.on('click', 'button.like', function (ev) {
// 		var $this = $(this);
// 		$this.animate({
// 			'fontSize': '30px'
// 		}, 'fast')
// 		$this.closest('.tv-show')  /*closets function de jquery que busca padre que cumpla condicion*/
// 			.toggleClass('liked')
// 	})


// 	/**
// 	 * Submit search form
// 	 */
// 	$('#app-body')
// 	 	.find('form')
// 	 	.submit(function (ev) {
// 	 		ev.preventDefault();
// 	 		debugger
// 	 		var query = $(this)
// 	 			.find('input[type="text"]')
// 	 			.val();
// 			$tvShowsContainer.find('.tv-show').remove()
// 			var $loader = $('<div class="loader"></div>')
// 			$loader.appendTo($tvShowsContainer)
// 	 		$.ajax('http://api.tvmaze.com/search/shows', { data: { q: query} })
// 	 			.then(function (res) {
// 	 				$loader.remove();
// 	 				var shows = res.map(function (el) {
// 	 					return el.show
// 	 				})
// 	 				renderShows(shows)
// 	 			})
// 		})


// 	
// })
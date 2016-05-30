import $ from 'jquery';
import page from 'page';
import { getShows, searchShows } from './tvmaze-api-client';  /*como exportamos 2 funciones entonces utilizamos llaves*/
import renderShows from './render';
import $tvShowsContainer from './tv-shows-container';
import './search-form';
import qs from 'qs';

page('/', function (ctx, next) {
    $tvShowsContainer.find('.tv-show').remove()
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

page('/search', function (ctx, next) {
	$tvShowsContainer.find('.tv-show').remove()
	var $loader = $('<div class="loader"></div>')
	$loader.appendTo($tvShowsContainer)
	/*ctx.querystring es un string como 'q=walking dead' y qs.parse lo transforma a un objeto json como {q: 'walking dead'}*/
	const busqueda = qs.parse(ctx.querystring)  
	searchShows(busqueda, function (res) {
		$loader.remove();
		var shows = res.map(function (el) {
			return el.show
		})
		renderShows(shows)
	})
})

page()
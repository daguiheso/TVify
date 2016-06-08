import $ from 'jquery';
// import $tvShowsContainer from 'src/tv-shows-container';
import $tvShowsContainer from '../tv-shows-container';


let template = `<article class="tv-show">
					<div class="left img-container">
						<img src=":img:" alt=":img alt:">
					</div>
					<div class="right info">
						<h1>:name:</h1>
						<p>:summary:</p>
						<button data-id=:id: class="like">💙</button>
					</div>
				</article>`

/*como solo es una function a exportar ponemos default y de esta manera cuando  
importemos este modulo no hace falta especificar que estamos importando */ 
export default function renderShows(shows) {
	$tvShowsContainer.find('.loader').remove()
	shows.forEach(function (show) {
		var article = template
			.replace(':name:', show.name)
			.replace(':img:', show.image ? show.image.medium : '')
			.replace(':summary:', show.summary)
			.replace(':img alt:', show.name + "Logo")
			.replace(':id:', show.id)
		// Convirtiendo en jquery object
		var $article = $(article)
		$tvShowsContainer.append($article)
		$article.hide()
		$article.show('slow')
	})
}
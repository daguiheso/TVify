import $ from 'jquery';
import page from 'page';

$('#app-body')
 	.find('form')
 	.submit(function (ev) {
 		ev.preventDefault();

 		var busqueda = $(this)
 			.find('input[type="text"]')
 			.val();

 		page(`/search?q=${busqueda}`)   /*lo que le paso a page se recibe como parametro ctx en index,js principal*/

	})
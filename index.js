$(function() {
	/**
	 * Submit search form
	 */
	 $('#app-body')
	 	.find('form')
	 	.submit(function (ev) {
	 		ev.preventDefault();
	 		var query = $(this)
	 			.find('input[type="text"]')
	 			.val();
	 		alert(query)
		})
})
import $ from 'jquery'

export function getShows (fn) {
  $.ajax('/api/shows', {
    success: function (shows, textStatus, xhr) {
      fn(shows) /* cuando ya este la lista de shows de le pasan al cb*/
    }
  })
}

export function searchShows (busqueda, fn) {
  $.ajax('http://api.tvmaze.com/search/shows', {
    data: busqueda,
    success: function (res, textStatus, xhr) {
      fn(res)
    }
  })
}

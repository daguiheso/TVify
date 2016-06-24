import Vote from '../models'

export function incrementVote (id, cb) {
  /* primer documento que venga con esta condicion*/
  Vote.findOne({ showId: id }, (err, doc) => {
    if (!err && doc) {
      /* actualizo este doc*/
      doc.count = doc.count + 1
      doc.save((err) => {
        if (err) return cb(err)
        cb(null, doc)
      })
    } else {
      /* creo un doc nuevo y le pongo count 1*/
      let vote = new Vote()
      vote.showId = id
      vote.count = 1
      vote.save((err) => {
        if (err) return cb(err)
        cb(null, vote)
      })
    }
  })
}

export function addVotes (shows, cb) {
  getVotes((err, votes) => {
    if (err) votes = []

    /* recorrer array shows y array votes y machearlos por id- merge de data*/
    shows = shows.map(show => {
      /* a filter se le pasa una function para filtrar valores dentro de un array,
         entonces la function espera que retorne un valor booleano con la info que
         va a filtrar, filter retorna un arreglo por eso el [0]
      */
      let vote = votes.filter(vote => vote.showId === show.id)[0]
      show.count = vote ? vote.count : 0
      return show /* retrun del objeto transformado*/
    })

    cb(shows)
  })
}

export function getVotes (cb) {
  Vote.find({}, (err, votes) => {
    if (err) return cb(err) /* retorno el error al callback*/

    cb(null, votes)
  })
}

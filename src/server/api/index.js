import express from 'express'
import Vote from '../models'
import tvmaze from 'tvmaze-dh'

const router = express.Router()
const client = tvmaze.createClient()

function addVotes (shows, cb) {
  Vote.find({}, (err, votes) => {
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

router.get('/shows', (req, res) => {
  client.shows((err, shows) => {
    if (err) {
      return res.sendStatus(500).json(err)
    }

    addVotes(shows, shows => {
      res.json(shows)
    })
  })
})

// GET /api/votes
router.get('/votes', (req, res) => {
  console.log('Estoy en GET /votes')
  Vote.find({}, (err, docs) => {
    if (err) {
      return res.sendStatus(500).json(err)
    }
    res.json(docs)
  })
})

// POST /api/vote/123
router.post('/vote/:id', (req, res) => { /* express lo procesa como un parametro */
  let id = req.params.id

  var onSave = function (vote) {
    return err => {
      if (err) {
        return res.sendStatus(500).json(err)
      }
      res.json(vote)
    }
  }

  /* primer documento que venga con esta condicion*/
  Vote.findOne({ showId: id }, (err, doc) => {
    if (!err && doc) {
      /* actualizo este doc*/
      doc.count = doc.count + 1
      doc.save(onSave(doc))
    } else {
      /* creo un doc nuevo y le pongo count 1*/
      let vote = new Vote()
      vote.showId = id
      vote.count = 1
      vote.save(onSave(vote))
    }
  })
})

export default router

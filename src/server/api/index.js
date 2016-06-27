import express from 'express'
import tvmaze from 'tvmaze-dh'
import { getVotes, addVotes, incrementVote } from '../lib'

const router = express.Router()
const client = tvmaze.createClient()

// GET /api/shows?id
router.get('/show/:id', (req, res) => {
  let id = req.params.id

  client.show(id, (err, show) => {
    if (err) {
      return res.sendStatus(500).json(err)
    }

    res.json(show)
  })
})

// GET /api/shows
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

// GET /api/search
router.get('/search', (req, res) => {
  let query = req.query.q
  console.log(req.query)

  client.search(query, (err, shows) => {
    if (err) {
      return res.sendStatus(500).json(err)
    }

    shows = shows.map(show => show.show)

    addVotes(shows, shows => {
      res.json(shows)
    })
  })
})

// GET /api/votes
router.get('/votes', (req, res) => {
  getVotes((err, votes) => {
    if (err) {
      return res.sendStatus(500).json(err)
    }

    res.json(votes)
  })
})

// POST /api/vote/123
router.post('/vote/:id', (req, res) => { /* express lo procesa como un parametro */
  let id = req.params.id

  incrementVote(id, (err, vote) => {
    if (err) {
      return res.sendStatus(500).json(err)
    }

    res.json(vote)
  })
})

export default router

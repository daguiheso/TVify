import express from 'express'
const router = express.Router()  

const votes = {}


// GET /api/votes
router.get('/votes', (req, res) => {
	console.log('Estoy en GET /votes')
	res.json(votes)
})

// POST /api/vote/123
router.post('/vote/:id', (req, res) => { /*express lo procesa como un parametro*/
	let id = req.params.id
	if (votes[id] === undefined)
		votes[id] = 1
	else
		votes[id] = votes[id] + 1

	res.json({ votes: votes[id]})
})

export default router
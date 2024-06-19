import express from 'express'
import { deleteMovie, getMovieAll, postMovie } from '../controllers/movieController.js'

const router = express.Router()

router.get('/', getMovieAll)
router.delete('/:id', deleteMovie)
router.post('/', postMovie)

export default router
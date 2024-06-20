import express from 'express'
import { deleteMovie, getMovieAll, getMovieById, postMovie, putMovieToViewed } from '../controllers/movieControllers.js'
import movieToDb from '../middleware/movieToDb.js'

const router = express.Router()

router.get('/', getMovieAll)
router.get('/:id', getMovieById)
router.delete('/:id', deleteMovie)
router.post('/', movieToDb, postMovie)
router.put('/:id', putMovieToViewed)

export default router
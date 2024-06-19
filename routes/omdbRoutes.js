import express from 'express'
import { getOmdbSearch, getOmdbByImdbId } from '../controllers/omdbController.js'

const router = express.Router()

router.get('/', getOmdbSearch)
router.get('/:id', getOmdbByImdbId)

export default router
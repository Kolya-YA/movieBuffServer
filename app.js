import express from "express"
import cors from 'cors'
import moviesRoutes from './routes/movieRoutes.js'
import omdbRoutes from './routes/omdbRoutes.js'

const corsOptions = {
    origin: process.env.ORIGINS.split(', ')
}

const app = express()

app.use(cors(corsOptions))
app.use(express.json())

app.use('/api/v1/movies', moviesRoutes)
app.use('/api/v1/omdb', omdbRoutes)

export default app
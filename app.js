import express from "express"
import cors from 'cors'
import moviesRoutes from './routes/movieRoutes.js'
import omdbRoutes from './routes/omdbRoutes.js'

const corsOptions = {
    origin: ['http://localhost:5173', 'https://gulmina.github.io/wd51-contentfull']
}

const app = express()

app.use(cors(corsOptions))
app.use(express.json())

app.use('/api/v1/movies', moviesRoutes)
app.use('/api/v1/omdb', omdbRoutes)

export default app
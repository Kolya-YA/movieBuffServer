import { sql } from '../db/pg.js'
import { movieData } from '../utils/movieUtils.js'

export const getMovieAll = async (req, res) => {
    try {
        const movies = await sql`SELECT * from movies`
        res.json(movies)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteMovie = async (req, res) => {
    try {
        const delMovie = await sql`
            UPDATE movies
            SET is_deleted = TRUE
            WHERE imdbid = ${req.params.id}
            RETURNING *
        `
        res.json(delMovie)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const postMovie = async (req, res) => {
    
    try {
        const { imdbID, Title, YearStart, YearEnd,
                Rated, Runtime, Genre, Director,
                Actors, Plot, Country, Poster,
                imdbRating, Type, totalSeasons } = movieData(req.body)

        
        const newMovie = await sql`
            INSERT INTO movies (
                imdbID, Title, YearStart, YearEnd,
                Rated, Runtime, Genre, Directors,
                Actors, Plot, Country, Poster,
                imdbRating, Type, TotalSeasons
                )
            VALUES (
                ${imdbID}, ${Title}, ${YearStart}, ${YearEnd},
                ${Rated}, ${Runtime}, ${Genre}, ${Director},
                ${Actors}, ${Plot}, ${Country}, ${Poster},
                ${imdbRating}, ${Type}, ${totalSeasons}
                )
            ON CONFLICT (imdbID) DO UPDATE SET is_deleted = FALSE
            RETURNING *
        `
        res.json(newMovie[0])
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}
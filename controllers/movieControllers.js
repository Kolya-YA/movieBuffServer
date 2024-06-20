import { sql } from '../db/pg.js'

export const getMovieAll = async (req, res) => {
    const showDel = req.query.del === 'true' ? true : false

    try {
        const movies = await sql`
            SELECT * FROM movies
            ${showDel ? sql`` : sql`WHERE is_deleted = FALSE`}
        `
        res.json(movies)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getMovieById = async (req, res) => {
    try {
        const movie = await sql`
            SELECT * from movies
            WHERE imdbID = ${req.params.id}
            `
        res.json(movie)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteMovie = async (req, res) => {
    const query =`
            UPDATE movies
            SET is_deleted = NOT is_deleted
            WHERE imdbid = $1
            RETURNING *
        `
    try {
        const delMovie = await sql.unsafe(query, [req.params.id])
        res.json(delMovie[0])
    } catch (error) {
        res.status(500).send(error)
    }
}

export const postMovie = async (req, res) => {
    const fieldNames = Object.keys(req.movie).join(', ')
    const values = Object.values(req.movie)    
    const valuePlaceholders = values.map((_, index) => `$${index + 1}`).join(', ');
    const query = `
        INSERT INTO movies (${fieldNames})
        VALUES (${valuePlaceholders})
        ON CONFLICT (imdbID) DO UPDATE SET is_deleted = FALSE
        RETURNING *;
    `
    
    try {
        const newMovie = await sql.unsafe(query, values);   
        res.json(newMovie[0])
    } catch (error) {
        console.error('Post movie error:', error)
        res.status(500).json(error)
    }
}

export const putMovieToViewed = async (req, res) => {
    const values = [req.body.vieweddate, req.body.myrating, req.params.id]
    const query = `
        UPDATE movies
        SET vieweddate = $1, myrating = $2
        WHERE imdbid = $3
        RETURNING *;
    `

    try {
        const viewedMovie = await sql.unsafe(query, values)    
        res.json(viewedMovie[0])
    } catch (error) {
        console.error('Put movie error:', error)
        res.status(500).json(error)
    }
}
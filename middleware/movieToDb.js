const movieToDb = (req, res, next) => {
    const movie = req.body
    req.movie = {
        imdbID: movie.imdbID ?? null,
        Title: movie.Title ?? null,
        YearStart: movie.Year?.split('–')[0] ?? null,
        YearEnd: movie.Year?.split('–')[1] ?? null,
        Rated: movie.Rated ?? null,
        Runtime: parseInt(movie.Runtime) || null,
        Genre: movie.Genre ?? null,
        Directors: movie.Director ?? null,
        Actors: movie.Actors ?? null,
        Plot: movie.Plot ?? null,
        Country: movie.Country ?? null,
        Poster: movie.Poster ?? null,
        imdbRating: movie.imdbRating ?? null,
        Type: movie.Type ?? null,
        TotalSeasons: movie.totalSeasons ?? null
    }

    next()
}

export default movieToDb
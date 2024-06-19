export const movieData = m => {

    return {
        imdbID: m.imdbID ?? null,
        Title: m.Title ?? null,
        YearStart: m.Year?.split('–')[0] ?? null,
        YearEnd: m.Year?.split('-')[1] ?? null,
        Rated: m.Rated ?? null,
        Runtime: parseInt(m.Runtime) || null,
        Genre: m.Genre ?? null,
        Director: m.Director ?? null,
        Actors: m.Actors ?? null,
        Plot: m.Plot ?? null,
        Country: m.Country ?? null,
        Poster: m.Poster ?? null,
        imdbRating: m.imdbRating ?? null,
        Type: m.Type ?? null,
        totalSeasons: m.totalSeasons ?? null
    }
}
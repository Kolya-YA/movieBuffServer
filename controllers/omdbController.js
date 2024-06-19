const API_KEY = process.env.VITE_OMDB_API_KEY_II
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`

export const getOmdbSearch = async (req, res) => {
    const { s: searchStr, page: pageNo } = req.query
    
    const urlString = encodeURIComponent(searchStr.trim().toLowerCase())
    const urlPage = pageNo > 1 ? `&page=${pageNo}` : ''
    try {
        const response = await fetch(`${API_URL}&s=${urlString}${urlPage}`)
        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).send(`Error fetching movies ${error}`)
    }
}


export const getOmdbByImdbId = async (req, res) => {
    const imdbId = req.params.id
    try {
        const response = await fetch(`${API_URL}&i=${imdbId}&plot=full`)
        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).send(`Error fetching movie ${error}`)
    }
}
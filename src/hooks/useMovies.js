import { useState, useRef, useMemo, useCallback } from "react"
import { getMovies } from "../services"


export const useMovies = (query, sort) => {
    const [responseMovies, setResponseMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const previusQuery = useRef(query)

    const obtainMovies = useCallback(async (query) => {
        if (previusQuery.current === query) return
        try {
            setLoading(true)
            previusQuery.current = query
            const movies = await getMovies(query)
            setResponseMovies(movies)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }, [])

    const sortMovies = useMemo(() => {
        const mappedMovies = responseMovies?.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster
        }))

        return sort
            ? [...mappedMovies].sort((a, b) => a.title.localeCompare(b.title))
            : mappedMovies
    }, [sort, responseMovies]);

    return {
        loading,
        mappedMovies: sortMovies,
        obtainMovies
    }
}

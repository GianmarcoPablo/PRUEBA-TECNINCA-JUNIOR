import { setMovies, setLoading } from "./moviesSlice"

const getMovies = (search) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const response = await fetch(`https://www.omdbapi.com/?apikey=517208e4&s=${search}`)
            const { Search } = await response.json()
            dispatch(setMovies(Search))
            dispatch(setLoading(false))
        } catch (error) {
            console.log(error);
            dispatch(setLoading(false))
        }
    }
}

export {
    getMovies,
}
import { useSelector } from "react-redux"
import { useMemo } from "react"

function Movies() {

    const { movies, isLoading } = useSelector(state => state.movies)

    const hasMovies = movies?.length > 0
    return (
        <>
            {isLoading && <p className="text-center text-2xl text-blue-700 font-bold">Loading...</p>}
            {!isLoading && hasMovies && <ListMovies movies={movies} />}
            {!isLoading && !hasMovies && <NotMovies />}
        </>
    )
}

function NotMovies() {
    return (
        <div>
            <p className="text-center text-2xl">No movies found</p>
        </div>
    )
}

function ListMovies({ movies }) {

    const { sort } = useSelector(state => state.movies)

    const sortedMovies = useMemo(() => {
        const mappedMovies = movies?.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
        }))

        return sort ? mappedMovies.sort((a, b) => a.title.localeCompare(b.title)) : mappedMovies
    }, [sort, movies])

    return (
        <div className="mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedMovies.map((movie) => (
                    <div key={movie.id} className="rounded-lg ">
                        <img className="object-cover flex mx-auto" src={movie.poster} alt={movie.title} />
                        <div className="p-4 flex flex-col items-center">
                            <h3 className="text-gray-900 font-bold text-xl mb-2">{movie.title}</h3>
                            <p className="text-gray-700 text-base">{movie.year}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export {
    Movies,
    NotMovies,
    ListMovies,
}


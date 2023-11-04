

function RendersNotResults() {
    return (
        <p>
            No se encontraron peliculas para esta busqueda
        </p>
    )
}

function Movies({ movies, loading }) {

    if (!movies.length) {
        return <RendersNotResults />
    }

    return (
        <>
            {loading ? <p className="loading">Cargando...</p> :
                <ListOfMovies movies={movies} />}
        </>
    )
}

function ListOfMovies({ movies }) {
    return (
        <ul className="movies">
            {movies.map(movie => (
                <li className="movie" key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <img src={movie.poster} alt={movie.title} />
                </li>
            ))}
        </ul>
    )
}

export {
    ListOfMovies,
    RendersNotResults,
    Movies
}


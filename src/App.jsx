import { Movies } from "./components/Movies"
import { useState, useEffect } from "react"
import useSearch from "./hooks/useSearch"
import { useMovies } from "./hooks/useMovies"

export default function App() {


    const [sort, setSort] = useState(false)
    const { query, error, handleChange, isFirstInput } = useSearch()
    const { mappedMovies, obtainMovies, loading } = useMovies(query, sort)


    const handleSubmit = e => {
        e.preventDefault()
        obtainMovies(query)
    }

    const handleSort = () => {
        setSort(!sort)
    }


    useEffect(() => {
        console.log("new getMovies recived");
    }, [obtainMovies])

    return (
        <div className="page">
            <header>
                <h1>Buscador de Películas</h1>
                <form
                    onSubmit={handleSubmit}
                    className="form centrado">
                    <input
                        ref={isFirstInput}
                        value={query}
                        onChange={handleChange}
                        type="text"
                        placeholder="Avengers, Star Wars, Harry Potter..."
                    />
                    <input
                        type="checkbox"
                        onChange={handleSort}
                        checked={sort}
                    />
                    <button
                        type="submit">
                        Buscar
                    </button>
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </header>

            <main>
                <Movies
                    loading={loading}
                    movies={mappedMovies} />
            </main>
        </div >
    )
}

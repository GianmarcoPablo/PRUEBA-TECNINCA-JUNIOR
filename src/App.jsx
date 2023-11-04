import { useDispatch, useSelector } from "react-redux"
import { getMovies } from "./store/slices/movies/thunks"
import { Movies } from "./components/Movies"
import useForm from "./hooks/useForm"
import { setSort } from "./store/slices/movies/moviesSlice"
import { useRef, useCallback, useEffect } from "react"

export default function App() {
    const dispatch = useDispatch()
    const { error, sort } = useSelector(state => state.movies)
    const { search, setSearch, isFirstInput } = useForm()
    const previusQuery = useRef(null)

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        if (search === previusQuery.current) {
            return; // Evitar solicitudes duplicadas
        }
        dispatch(getMovies(search))
        previusQuery.current = search
    }, [dispatch, search])
    //probar renders


    return (
        <>
            <h1 className='text-center my-5 text-4xl font-bold'>Search a movies</h1>
            <>
                <div className='flex justify-center'>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="checkbox"
                            name="sort"
                            id="sort"
                            checked={sort}
                            onChange={() => dispatch(setSort(!sort))}
                        />
                        <input
                            className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none'
                            type="text"
                            name="query"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search a movie..."
                            ref={isFirstInput}
                        />

                        <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                            type="submit"
                        >
                            Search
                        </button>
                    </form>
                </div>
                {error && <p className="text-center text-lg text-red-700 font-bold">{error}</p>}
            </>

            <main className="container mx-auto">
                <Movies />
            </main>
        </>
    )
}

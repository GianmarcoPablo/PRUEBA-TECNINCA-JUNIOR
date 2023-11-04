import { useState, useEffect, useRef } from "react"
import { useMovies } from "./useMovies"

export default function useSearch() {

    const [query, setQuery] = useState("")
    const [error, setError] = useState(null)
    const { obtainMovies } = useMovies()

    const isFirstInput = useRef(null)

    const handleChange = ({ target }) => {
        const newSearch = target.value
        setQuery(newSearch)
        obtainMovies(newSearch)
    }

    useEffect(() => {
        if (isFirstInput.current) {
            isFirstInput.current = false
            return
        }

        if (query.match(/^[0-9]+$/)) {
            setError("No se puede buscar un numero")
            return
        }
        if (query.length < 3) {
            setError("No se puede buscar menos de 3 caracteres")
            return
        }
        setError(null)
    }, [query])

    return {
        query,
        error,
        handleChange,
        isFirstInput
    }
}

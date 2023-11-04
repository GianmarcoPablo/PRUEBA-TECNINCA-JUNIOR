import { useEffect, useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { setError } from "../store/slices/movies/moviesSlice"

export default function useForm() {

    const [search, setSearch] = useState("")
    const isFirstInput = useRef(true)
    const dispatch = useDispatch()

    useEffect(() => {

        if (isFirstInput.current) {
            isFirstInput.current = false
            return  
        }

        if (search.match(/^[0-9]+$/)) {
            dispatch(setError("Please enter a valid search"))
            return
        }

        if (search.length < 3) {
            dispatch(setError("Please enter at least 3 characters"))
            return
        }

        dispatch(setError(""))
    }, [search])

    return {
        search,
        setSearch,
        isFirstInput
    }
}

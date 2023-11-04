import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        isLoading: false,
        movies: [],
        error: '',
        sort: false,
    },
    reducers: {
        setMovies: (state, action) => {
            state.movies = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
    },
});

export const { setMovies, setLoading, setError, setSort } = moviesSlice.actions;

export default moviesSlice.reducer;


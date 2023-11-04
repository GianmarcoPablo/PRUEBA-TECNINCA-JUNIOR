import withNotResults from "../mocks/not-results.json"

export async function getMovies(query) {
    try {
        if (query) {
            const respuesta = await fetch(`https://www.omdbapi.com/?apikey=517208e4&s=${query}`);
            const data = await respuesta.json();
            return data.Search;
        } else {
            return withNotResults.Search;
        }
    } catch (error) {
        console.log(error);
    }
}


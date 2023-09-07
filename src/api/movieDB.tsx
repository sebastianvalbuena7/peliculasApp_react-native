import axios from "axios"

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '16dcf21f09991dee554487a44feaa83d',
        language: 'es-ES'
    }
})

export default movieDB
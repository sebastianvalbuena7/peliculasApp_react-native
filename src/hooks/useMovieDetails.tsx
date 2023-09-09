import { useEffect, useState } from 'react'
import movieDB from "../api/movieDB"
import { MovieFull } from "../interfaces/movieInterface"
import { CreditsResponse, Cast } from '../interfaces/creditsInterface'

interface MovieDetails {
    cast: any[],
    isLoading?: boolean,
    movieFull?: MovieFull
}

export const useMovieDetails = (movieId: number) => {
    const [state, setState] = useState<MovieDetails>({
        isLoading: true,
        movieFull: undefined,
        cast: []
    })

    const getMovieDetails = async () => {
        const movieDetailsPromise = await movieDB.get<MovieFull>(`/${movieId}`)
        const castPromise = await movieDB.get<CreditsResponse>(`/${movieId}/credits`)

        const [movieDetailResp, castPromiseResp] = await Promise.all([movieDetailsPromise, castPromise])
        
        setState({
            isLoading: false,
            movieFull: movieDetailResp.data,
            cast: castPromiseResp.data.cast
        })
    }

    useEffect(() => {
        getMovieDetails()
    }, [])

    return {
        ...state
    }
}
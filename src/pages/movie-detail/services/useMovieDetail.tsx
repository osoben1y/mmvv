import { useQuery } from "@tanstack/react-query"
import { api } from "../../../shared/api"

export const movieDetailKey = "movieDetailKey"

export const useMovieById = (id: string) => {
    return useQuery({
        queryKey: [movieDetailKey, id],
        queryFn: () => api.get(`movie/${id}`).then(res => res.data)
    })
}

export const useMovieItems = (id: string, path: string) => {
    return useQuery({
        queryKey: [movieDetailKey, id, path],
        queryFn: () => api.get(`movie/${id}/${path}`).then(res => res.data)
    })
}
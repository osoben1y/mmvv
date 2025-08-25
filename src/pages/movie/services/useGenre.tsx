import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/api";

export const movieGenreKey = "movieGenreKey";

export const useMovieGenre = () => {
  const getMovieGenres = () =>
    useQuery({
      queryKey: [movieGenreKey],
      queryFn: () => api.get("genre/movie/list").then((res) => res.data),
    });

    return { getMovieGenres };
};

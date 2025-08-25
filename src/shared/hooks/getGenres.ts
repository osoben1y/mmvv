import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

interface IParams {
  page?: string;
  with_genres?: string;
  "release_date.gte"?:string
  "release_date.lte"?:string
}

export const getGenres = () =>
  api.get("genre/movie/list").then((res) => res.data.genres);

const getPopularMovies = (params?: IParams) =>
  api.get("discover/movie", { params }).then((res) => res.data.results);

const fetchMoviesWithGenres = async (params?: IParams) => {
  const [genres, movies] = await Promise.all([
    getGenres(),
    getPopularMovies(params),
  ]);

  const genreMap = Object.fromEntries(genres.map((g: any) => [g.id, g.name]));

  return movies.map((movie: any) => ({
    ...movie,
    genres: movie.genre_ids.map((id: any) => genreMap[id] || "Unknown"),
  }));
};

export const useFullMovieData = (params?: IParams) =>
  useQuery({
    queryKey: ["movies-with-genres", params],
    queryFn: () => fetchMoviesWithGenres(params),
  });

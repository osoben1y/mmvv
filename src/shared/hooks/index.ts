import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

const getGenres = () =>
  api.get("genre/movie/list").then((res) => res.data.genres);

const getPopularMovies = () =>
  api.get("movie/popular").then((res) => res.data.results);

const fetchMoviesWithGenres = async () => {
  const [genres, movies] = await Promise.all([getGenres(), getPopularMovies()]);

  const genreMap = Object.fromEntries(genres.map((g: any) => [g.id, g.name]));

  return movies.map((movie: any) => ({
    ...movie,
    genres: movie.genre_ids.map((id: any) => genreMap[id] || "Unknown"),
  }));
};

export const useFullMovieData = () =>
  useQuery({
    queryKey: ["movies-with-genres"],
    queryFn: fetchMoviesWithGenres,
  });

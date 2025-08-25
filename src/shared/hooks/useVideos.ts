import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export const videosKey = "videosKey";

export const useVideos = () => {
  const getMovieVideos = (movieId: string) =>
    useQuery({
      queryKey: [videosKey, movieId],
      queryFn: () => api.get(`movie/${movieId}/videos`).then((res) => res.data),
      enabled: !!movieId,
    });

  return { getMovieVideos };
};
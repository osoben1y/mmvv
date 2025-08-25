import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/api";

export const searchKey = "searchKey";

export const useSearch = () => {
  const searchMovies = (query: string, page: string = "1") =>
    useQuery({
      queryKey: [searchKey, query, page],
      queryFn: () =>
        api
          .get("search/movie", {
            params: {
              query,
              page,
            },
          })
          .then((res) => res.data),
      enabled: !!query,
    });

  return { searchMovies };
};
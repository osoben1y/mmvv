import { memo, useState, useEffect, useRef, useCallback } from "react";
import { useSearch } from "./services/useSearch";
import MovieView from "../../shared/components/movie-view/MovieView";
import { Input } from "antd";
import { useParamsHooks } from "../../shared/hooks/useParams";
import { Search as SearchIcon } from "lucide-react";
import ErrorBoundary from "../../shared/components/error/ErrorBoundary";
import ErrorFallback from "../../shared/components/error/ErrorFallback";
import MovieCardSkeleton from "../../shared/components/loading/MovieCardSkeleton";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  const { getParam, setParam } = useParamsHooks();
  const query = getParam("query") || "";

  const { searchMovies } = useSearch();
  const { data, isLoading, isFetching } = searchMovies(query, currentPage.toString());

  useEffect(() => {
    if (query) {
      setSearchValue(query);
    }
  }, [query]);

  // Reset state when query changes
  useEffect(() => {
    setSearchResults([]);
    setCurrentPage(1);
    setHasMore(true);
    setIsInitialLoad(true);
  }, [query]);

  // Update search results when data changes
  useEffect(() => {
    if (data?.results) {
      if (currentPage === 1) {
        setSearchResults(data.results);
      } else {
        setSearchResults(prev => [...prev, ...data.results]);
      }

      // Check if we've reached the end of available data
      if (data.results.length === 0 || (data.total_pages && currentPage >= Math.min(data.total_pages, 500))) {
        setHasMore(false);
      }

      setIsInitialLoad(false);
    }
  }, [data, currentPage]);

  const handleSearch = () => {
    if (searchValue.trim()) {
      setParam("query", searchValue);
      setSearchResults([]);
      setCurrentPage(1);
      setHasMore(true);
      setIsInitialLoad(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Intersection Observer callback
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting && !isLoading && !isFetching && hasMore && query) {
      setCurrentPage(prev => prev + 1);
    }
  }, [isLoading, isFetching, hasMore, query]);

  // Set up the Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.1
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [handleObserver]);

  return (
    <section className="container mx-auto px-4 py-4 sm:py-8 text-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Поиск фильмов</h1>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="relative flex-1">
          <Input
            placeholder="Введите название фильма..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full py-3 px-4 bg-[#1c1c1c] text-white border-gray-700 rounded-xl"
            style={{ height: "50px" }}
          />
          <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={handleSearch}
          className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-3 rounded-xl transition-colors w-full sm:w-auto"
        >
          Поиск
        </button>
      </div>

      {query ? (
        <div className="mb-4 sm:mb-6">
          <p className="text-gray-300 text-sm sm:text-base">
            {data?.total_results
              ? `Найдено ${data.total_results} результатов по запросу "${query}"`
              : `По запросу "${query}" ничего не найдено`}
          </p>
        </div>
      ) : (
        <div className="mb-4 sm:mb-6">
          <p className="text-gray-300 text-sm sm:text-base italic">
              Kino dlya dushi...
          </p>
        </div>
      )}

      <ErrorBoundary>
        {isInitialLoad && isLoading ? (
          <div className="container mx-auto py-4">
            <MovieCardSkeleton count={20} />
          </div>
        ) : searchResults && searchResults.length > 0 ? (
          <>
            <MovieView data={searchResults} />
            {hasMore && (
              <div ref={loaderRef} className="flex justify-center py-8">
                <MovieCardSkeleton count={5} />
              </div>
            )}
            {!hasMore && (
              <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                Вы достигли конца результатов поиска
              </div>
            )}
          </>
        ) : query && !isLoading ? (
          <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            По запросу "{query}" ничего не найдено
          </div>
        ) : (
          <ErrorFallback message="Не удалось загрузить результаты поиска" />
        )}
      </ErrorBoundary>
    </section>
  );
};

export default memo(Search);
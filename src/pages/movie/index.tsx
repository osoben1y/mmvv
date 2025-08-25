import { memo, useEffect, useState, useRef, useCallback } from "react";
import MovieView from "../../shared/components/movie-view/MovieView";
import { getGenres, useFullMovieData } from "../../shared/hooks/getGenres";
import { Select } from "antd";
import { useParamsHooks } from "../../shared/hooks/useParams";
import { useMovie } from "./services/useMovie";
import { Period } from "../../shared/static";
import ErrorBoundary from "../../shared/components/error/ErrorBoundary";
import ErrorFallback from "../../shared/components/error/ErrorFallback";
import MovieCardSkeleton from "../../shared/components/loading/MovieCardSkeleton";

const Movie = () => {
  const [movieGenres, setMovieGenres] = useState<any>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  const { getParam, setParam } = useParamsHooks();
  const with_genres = getParam("genre") || "";
  const period = getParam("period") || "";

  const item = Period.find((item) => item.value === Number(period));
  const { getMovies } = useMovie();
  const { data: totalMovies } = getMovies();
  
  const { data, isLoading, isFetching } = useFullMovieData({
    page: currentPage.toString(),
    with_genres,
    "release_date.gte": item?.gte,
    "release_date.lte": item?.lte,
  });

  useEffect(() => {
    getGenres().then((res) => setMovieGenres(res));
  }, []);

  // Reset state when filters change
  useEffect(() => {
    setMovies([]);
    setCurrentPage(1);
    setHasMore(true);
    setIsInitialLoad(true);
  }, [with_genres, period]);

  // Update movies when data changes
  useEffect(() => {
    if (data) {
      if (currentPage === 1) {
        setMovies(data);
      } else {
        setMovies(prev => [...prev, ...data]);
      }
      
      // Check if we've reached the end of available data
      if (data.length === 0 || (totalMovies && currentPage * 20 >= Math.min(totalMovies.total_results, 10000))) {
        setHasMore(false);
      }
      
      setIsInitialLoad(false);
    }
  }, [data, currentPage, totalMovies]);

  const genres = movieGenres?.map((item: any) => ({
    value: item.id,
    label: item.name,
  }));

  const handleChange = (value: string) => {
    setParam("genre", value);
  };

  const handleChangePeriod = (value: string) => {
    setParam("period", value);
  };

  // Intersection Observer callback
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting && !isLoading && !isFetching && hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  }, [isLoading, isFetching, hasMore]);

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
    <>
      <section className="dark:bg-[#000000] dark:transition-all transition-all">
        <div className="container flex flex-col sm:flex-row gap-4 sm:gap-10 px-4 py-4 sm:py-6">
          <div className="w-full sm:w-auto">
            <h1 className="font-bold text-[16px] text-[#A1A1A1] pb-1 select-none">
              Filter by genre
            </h1>
            <Select
              onChange={handleChange}
              placeholder="Select genre"
              style={{ width: '100%' }}
              className="w-full sm:w-[180px]"
              options={genres}
            />
          </div>
          <div className="w-full sm:w-auto">
            <h1 className="font-bold text-[16px] text-[#A1A1A1] pb-1 select-none">
              Filter by period
            </h1>
            <Select
              onChange={handleChangePeriod}
              placeholder="Select period"
              style={{ width: '100%' }}
              className="w-full sm:w-[180px]"
              options={Period}
            />
          </div>
        </div>
        <ErrorBoundary>
          {isInitialLoad && isLoading ? (
            <div className="container mx-auto py-8">
              <MovieCardSkeleton count={20} />
            </div>
          ) : movies && movies.length > 0 ? (
            <>
              <MovieView data={movies} className="pt-5" />
              {hasMore && (
                <div ref={loaderRef} className="flex justify-center py-8">
                  <MovieCardSkeleton count={5} />
                </div>
              )}
              {!hasMore && (
                <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                  Вы достигли конца списка фильмов
                </div>
              )}
            </>
          ) : (
            <ErrorFallback message="Не удалось загрузить фильмы" />
          )}
        </ErrorBoundary>
      </section>
    </>
  );
};

export default memo(Movie);

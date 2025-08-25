import { memo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovieById, useMovieItems } from "./services/useMovieDetail";
import { IMAGE_URL } from "../../shared/const";
import MovieView from "../../shared/components/movie-view/MovieView";
import { CalendarDays, ChartNoAxesCombined, Clock, CircleDollarSign, PlayCircle, Heart } from "lucide-react";
import { useVideos } from "../../shared/hooks/useVideos";
import MovieTrailer from "../../shared/components/trailer/MovieTrailer";
import ErrorBoundary from "../../shared/components/error/ErrorBoundary";
import ErrorFallback from "../../shared/components/error/ErrorFallback";
import Skeleton from "../../shared/components/loading/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { selectIsFavorite, addToFavorites, removeFromFavorites } from "../../shared/slices/favoritesSlice";
import { selectIsAuthenticated } from "../../shared/slices/authSlice";
import { useTranslation } from "react-i18next";
type AppDispatch = any;

const MovieDetail = () => {
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { data, isLoading } = useMovieById(id || "");
  const { data: imagesData } = useMovieItems(id || "", "images");
  const { data: similarData } = useMovieItems(id || "", "similar");
  const { data: creditsData } = useMovieItems(id || "", "credits");
  const { getMovieVideos } = useVideos();
  const { data: videosData } = getMovieVideos(id || "");
  
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isFavorite = useSelector(selectIsFavorite(Number(id)));
  
  const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    if (isFavorite) {
      dispatch(removeFromFavorites(Number(id)));
    } else if (data) {
      dispatch(addToFavorites(data));
    }
  };
  
  const handleOpenTrailer = () => {
    const trailer = videosData?.results?.find(
      (video: any) => video.type === "Trailer" && video.site === "YouTube"
    );
    if (trailer) {
      setTrailerKey(trailer.key);
      setTrailerOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <Skeleton className="w-full h-[500px]" rounded="rounded-xl" />
        <Skeleton className="my-3 w-[60%] h-8" />
        <Skeleton className="my-3 w-[30%] h-8" />
        <div className="mt-12 space-y-16">
          <section>
            <Skeleton className="w-[200px] h-8 mb-6" />
            <div className="flex gap-6">
              <Skeleton count={5} className="min-w-[140px] h-[200px]" rounded="rounded-xl" />
            </div>
          </section>
          <section>
            <Skeleton className="w-[200px] h-8 mb-6" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <Skeleton count={8} className="w-full h-[180px]" rounded="rounded-xl" />
            </div>
          </section>
        </div>
      </div>
    );
  }
  
  if (!data) {
    return <ErrorFallback message={t('movie_detail.load_error')} />;
  }

  return (
    <>
      <ErrorBoundary>
        <div className="w-full text-white">
        <div className="relative w-full h-[500px] rounded-b-3xl overflow-hidden">
          <img
            loading="lazy"
            src={`${IMAGE_URL}w1280${data?.backdrop_path}`}
            srcSet={`${IMAGE_URL}w780${data?.backdrop_path} 780w, ${IMAGE_URL}w1280${data?.backdrop_path} 1280w, ${IMAGE_URL}original${data?.backdrop_path} 2000w`}
            sizes="(max-width: 768px) 780px, (max-width: 1280px) 1280px, 2000px"
            alt={data?.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'https://via.placeholder.com/1280x720?text=No+Image';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          <div className="absolute bottom-0 left-0 p-4 sm:bottom-10 sm:left-10 max-w-3xl w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg">{data?.title}</h1>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-gray-200 line-clamp-2 sm:line-clamp-3">{data?.overview}</p>
            <div className="mt-2 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-6 text-gray-300 text-xs sm:text-sm">
              <span><CalendarDays/> {data?.release_date?.split("-")[0]}</span>
              <span><ChartNoAxesCombined /> {data?.vote_average?.toFixed(1)}</span>
              <span><Clock /> {data?.runtime} min</span>
              <span><CircleDollarSign /> {data?.budget?.toLocaleString()} USD</span>
            </div>
            <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-4">
              {videosData?.results?.some((video: any) => video.type === "Trailer" && video.site === "YouTube") && (
                <button 
                  onClick={handleOpenTrailer}
                  className="flex items-center gap-1 sm:gap-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm py-2 px-3 sm:px-4 rounded-lg transition-colors"
                >
                  <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden xs:inline">{t('movie_detail.watch_trailer')}</span>
                  <span className="xs:hidden">{t('movie_detail.trailer')}</span>
                </button>
              )}
              <button 
                onClick={handleFavoriteToggle}
                className={`flex items-center gap-1 sm:gap-2 ${isFavorite ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'} text-white text-xs sm:text-sm py-2 px-3 sm:px-4 rounded-lg transition-colors`}
                aria-label={isFavorite ? t('movie_detail.remove_from_favorites') : t('movie_detail.add_to_favorites')}
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite ? 'fill-white' : ''}`} />
                <span className="hidden xs:inline">{isFavorite ? t('movie_detail.in_favorites') : t('movie_detail.add_to_favorites')}</span>
                <span className="xs:hidden">{isFavorite ? t('movie_detail.favorited') : t('movie_detail.favorite')}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-12 space-y-16">
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-6">{t('movie_detail.cast')}</h2>
            <div className="flex gap-3 sm:gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
              {creditsData?.cast?.slice(0, 12).map((user: any) => {
                const image = user.profile_path
                  ? `${IMAGE_URL}w185${user.profile_path}`
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png";
                return (
                  <div
                    key={user.id}
                    className="min-w-[110px] sm:min-w-[140px] bg-[#1c1c1c] rounded-xl p-3 sm:p-4 hover:bg-[#2a2a2a] transition"
                  >
                    <img
                      loading="lazy"
                      src={image}
                      srcSet={user.profile_path ? `${IMAGE_URL}w185${user.profile_path} 185w, ${IMAGE_URL}w300${user.profile_path} 300w` : undefined}
                      sizes="(max-width: 640px) 80px, 185px"
                      alt={user.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full object-cover mb-2 sm:mb-3"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png';
                      }}
                    />
                    <h3 className="text-center text-sm sm:text-base font-medium line-clamp-1">{user.name}</h3>
                    <p className="text-center text-xs sm:text-sm text-gray-400 line-clamp-1">{user.character}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-6">{t('movie_detail.movie_frames')}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
              {imagesData?.backdrops?.slice(0, 12)?.map((item: any, inx: number) => (
                <img
                  key={inx}
                  loading="lazy"
                  src={`${IMAGE_URL}w500${item.file_path}`}
                  srcSet={`${IMAGE_URL}w500${item.file_path} 500w, ${IMAGE_URL}w780${item.file_path} 780w, ${IMAGE_URL}original${item.file_path} 1280w`}
                  sizes="(max-width: 640px) 300px, (max-width: 1024px) 500px, 780px"
                  alt="Movie backdrop"
                  className="rounded-xl w-full h-[180px] object-cover hover:scale-[1.02] transition-transform"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://via.placeholder.com/500x280?text=No+Image';
                  }}
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-6">{t('movie_detail.similar_movies')}</h2>
            <MovieView data={similarData?.results} />
          </section>
        </div>
      </div>
      </ErrorBoundary>
      <MovieTrailer 
        videoKey={trailerKey} 
        isOpen={trailerOpen} 
        onClose={() => setTrailerOpen(false)} 
      />
    </>
  );
};

export default memo(MovieDetail);

import { memo, type FC, useState, useEffect } from "react";
import { IMAGE_URL } from "../../const";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Skeleton from "../../components/loading/Skeleton";

interface Props {
  data: any[];
  className?: string;
  isLoading?: boolean;
}

const getItemsPerView = () => {
  // Используем window.innerWidth, если доступно
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    if (width < 640) return 2; // Мобильные устройства
    if (width < 1024) return 3; // Планшеты
    return 4; // Десктопы
  }
  return 4; // Значение по умолчанию
};

const MovieSwiper: FC<Props> = ({ data, className, isLoading }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());
  
  // Обновляем количество элементов при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (isLoading) {
    return (
      <div className={`container mx-auto pt-[20px] pb-[80px] ${className || ""}`}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <Skeleton height={380} className="rounded-2xl" />
              <Skeleton height={20} width="80%" />
              <Skeleton height={16} width="60%" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }
  
  const maxIndex = Math.max(0, data.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  return (
    <div className={`relative container mx-auto px-4 ${className || ""}`}>
      <div className="overflow-hidden pt-[20px] pb-[80px]">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${(100 / itemsPerView) * currentIndex}%)`,
          }}
        >
          {data.map((movie) => (
            <div
              key={movie.id}
              className="w-1/2 sm:w-1/3 lg:w-1/4 flex-shrink-0 px-2 cursor-pointer group"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <div className="relative bg-[#1c1c1c] rounded-2xl overflow-hidden shadow-md transition-all duration-500 group-hover:shadow-red-500/30 group-hover:scale-[1.04]">
                <div className="relative">
                  <img
                    loading="lazy"
                    src={`${IMAGE_URL}w300${movie.poster_path}`}
                    srcSet={`${IMAGE_URL}w300${movie.poster_path} 300w, ${IMAGE_URL}w500${movie.poster_path} 500w, ${IMAGE_URL}original${movie.poster_path} 1000w`}
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 500px, 1000px"
                    alt={movie.title}
                    className="w-full h-[380px] object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-90"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-yellow-400 px-2 py-1 rounded-lg text-sm font-semibold">
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-4 text-white opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <h3
                    className="font-bold text-lg line-clamp-1"
                    title={movie.title}
                  >
                    {movie.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Release: {movie.release_date?.split("-")[0] || "—"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-[-30px] top-1/2 -translate-y-1/2 z-10 bg-[#1D1D1D] hover:bg-[#1D1D1D] text-[#C61F1F] p-3 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {currentIndex < maxIndex && (
        <button
          onClick={handleNext}
          className="absolute right-[-30px] top-1/2 -translate-y-1/2 z-10 bg-[#1D1D1D] hover:bg-[#1D1D1D] text-[#C61F1F] p-3 rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default memo(MovieSwiper);

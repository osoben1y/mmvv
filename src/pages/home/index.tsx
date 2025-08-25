import { memo } from 'react';
import Hero from './components/Hero';
import TopWeeks from "../../shared/components/top-weeks/TopWeeks";
import { useFullMovieData } from "../../shared/hooks";
import MovieSwiper from '../../shared/components/movie-swiper/MovieSwiper';

const Home = () => {

  const { data } = useFullMovieData();

  return (
    <div>
      <Hero />
      <div className="container-hero">
        <TopWeeks />
        <MovieSwiper data={data} />
      </div>
    </div>
  );
};

export default memo(Home);

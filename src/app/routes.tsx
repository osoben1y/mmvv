import { lazy, memo } from 'react';
import { useRoutes } from 'react-router-dom';
const MainLayout = lazy(()=> import("../layout/MainLayout"))
const Home = lazy(()=> import("../pages/home"))
const Movie = lazy(()=> import("../pages/movie"))
const MovieDetail = lazy(()=> import("../pages/movie-detail"))
const Search = lazy(()=> import("../pages/search"))
const Auth = lazy(()=> import("../pages/auth"))
const Favorites = lazy(()=> import("../pages/favorites"))

const AppRouters = () => {
  return useRoutes([
    {path: "/", element: <MainLayout/>, children: [
      {index: true, element:<Home/>},
      {path:"movie", element:<Movie/>},
      {path:"movie/:id", element:<MovieDetail/>},
      {path:"search", element:<Search/>},
      {path:"favorites", element:<Favorites/>},
    ]},
    {path: "/auth", element: <Auth/>}
  ])
};

export default memo(AppRouters);
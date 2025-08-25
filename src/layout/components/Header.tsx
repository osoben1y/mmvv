import { Search, House, Clapperboard, Menu, Heart, LogOut } from "lucide-react";
import Logo from "../../shared/assets/header_logo.svg";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "../../shared/components/theme/ThemeToggle";
import LanguageToggle from "../../shared/components/language/LanguageToggle";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuthenticated, logout } from "../../shared/slices/authSlice";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../shared/context/LanguageContext";

type AppDispatch = any;

export default function Header() {
  const [open, setOpen] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  useLanguage();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md dark:bg-black/80 bg-white/90 dark:border-gray-800 border-gray-200 border-b flex justify-center">
      <div className="container max-w-[1920px] h-[80px] flex items-center justify-between px-4">
        <NavLink to="/">
          <img src={Logo} alt="Logo" className="h-10" />
        </NavLink>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className="dark:text-white text-gray-800 hover:text-red-500 flex items-center gap-2">
            <House className="w-4 h-4" /> {t('header.sessions')}
          </NavLink>
          <NavLink to="/movie" className="dark:text-white text-gray-800 hover:text-red-500 flex items-center gap-2">
            <Clapperboard className="w-4 h-4" /> {t('header.movies')}
          </NavLink>
          <NavLink to="/search" className="dark:text-white text-gray-800 hover:text-red-500 flex items-center gap-2">
            <Search className="w-4 h-4" /> {t('header.search')}
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/favorites" className="dark:text-white text-gray-800 hover:text-red-500 flex items-center gap-2">
              <Heart className="w-4 h-4" /> {t('header.favorites')}
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LanguageToggle />

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md hidden md:flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Выйти
            </button>
          ) : (
            <NavLink
              to="/auth"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md hidden md:flex items-center gap-2"
            >
              {t('header.login')}
            </NavLink>
          )}

          <button onClick={() => setOpen(!open)} className="md:hidden text-white dark:text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute top-[80px] left-0 w-full dark:bg-black/95 bg-white/95 dark:border-gray-800 border-gray-200 border-t p-4 md:hidden">
          <NavLink to="/" className="flex items-center gap-3 py-3 dark:text-white text-gray-800 hover:text-red-500 border-b dark:border-gray-800 border-gray-200">
            <House className="w-5 h-5" /> <span>{t('header.sessions')}</span>
          </NavLink>
          <NavLink to="/movie" className="flex items-center gap-3 py-3 dark:text-white text-gray-800 hover:text-red-500 border-b dark:border-gray-800 border-gray-200">
            <Clapperboard className="w-5 h-5" /> <span>{t('header.movies')}</span>
          </NavLink>
          <NavLink to="/search" className="flex items-center gap-3 py-3 dark:text-white text-gray-800 hover:text-red-500 border-b dark:border-gray-800 border-gray-200">
            <Search className="w-5 h-5" /> <span>{t('header.search')}</span>
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/favorites" className="flex items-center gap-3 py-3 dark:text-white text-gray-800 hover:text-red-500 border-b dark:border-gray-800 border-gray-200">
              <Heart className="w-5 h-5" /> <span>{t('header.favorites')}</span>
            </NavLink>
          )}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 text-center rounded-md text-white mt-4"
            >
              <LogOut className="w-5 h-5" /> <span>{t('header.logout')}</span>
            </button>
          ) : (
            <NavLink
              to="/auth"
              className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 text-center rounded-md text-white mt-4"
            >
              <span>{t('header.login')}</span>
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
}

import { memo } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useTheme } from "../shared/context/ThemeContext";

const MainLayout = () => {
  const { theme } = useTheme();
  
  return (
    <div className={theme === 'dark' ? 'dark' : 'light'}>
      <Header />
      <main className="mt-[80px] min-h-screen">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default memo(MainLayout);

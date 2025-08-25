import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../shared/slices/authSlice';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { Navigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated, loading, error } = useSelector(selectAuth);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] py-8 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm 
            onSwitchToRegister={() => setIsLogin(false)} 
            error={error}
            loading={loading}
          />
        ) : (
          <RegisterForm 
            onSwitchToLogin={() => setIsLogin(true)} 
            error={error}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default memo(Auth);
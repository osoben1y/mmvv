import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, clearError } from '../../../shared/slices/authSlice';
type AppDispatch = any;
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  error: string | null;
  loading: boolean;
}

const LoginForm = ({ onSwitchToRegister, error, loading }: LoginFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) dispatch(clearError());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(login(formData));
    if (login.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

  return (
    <div className="w-full max-w-md p-5 sm:p-8 space-y-5 sm:space-y-6 bg-[#1c1c1c] rounded-xl shadow-lg">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl font-bold">{t('auth.login_title')}</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-400">{t('auth.login_subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-700 rounded-lg bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-xs sm:text-sm font-medium mb-1">
            {t('auth.password')}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-700 rounded-lg bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <div className="text-red-500 text-xs sm:text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 text-sm sm:text-base bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? t('auth.logging_in') : t('auth.login')}
        </button>
      </form>

      <div className="text-center text-xs sm:text-sm">
        <p className="text-gray-400">
          {t('auth.no_account')}{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-red-500 hover:underline focus:outline-none"
          >
            {t('auth.register')}
          </button>
        </p>
      </div>
    </div>
  );
};

export default memo(LoginForm);
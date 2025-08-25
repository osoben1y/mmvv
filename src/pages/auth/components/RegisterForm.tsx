import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { register, clearError } from '../../../shared/slices/authSlice';
// Define AppDispatch type locally
type AppDispatch = any;
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  error: string | null;
  loading: boolean;
}

const RegisterForm = ({ onSwitchToLogin, error, loading }: RegisterFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) dispatch(clearError());
    if (passwordError) setPasswordError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setPasswordError(t('auth.passwords_not_match'));
      return;
    }
    
    const { username, email, password } = formData;
    const resultAction = await dispatch(register({ username, email, password }));
    if (register.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

  return (
    <div className="w-full max-w-md p-5 sm:p-8 space-y-5 sm:space-y-6 bg-[#1c1c1c] rounded-xl shadow-lg">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl font-bold">{t('auth.create_account')}</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-400">{t('auth.register_subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label htmlFor="username" className="block text-xs sm:text-sm font-medium mb-1">
            {t('auth.username')}
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-700 rounded-lg bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="username"
          />
        </div>

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

        <div>
          <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-medium mb-1">
            {t('auth.confirm_password')}
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-700 rounded-lg bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="••••••••"
          />
        </div>

        {passwordError && (
          <div className="text-red-500 text-xs sm:text-sm">
            {passwordError}
          </div>
        )}

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
          {loading ? t('auth.registering') : t('auth.register')}
        </button>
      </form>

      <div className="text-center text-xs sm:text-sm">
        <p className="text-gray-400">
          {t('auth.have_account')}{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-red-500 hover:underline focus:outline-none"
          >
            {t('auth.login')}
          </button>
        </p>
      </div>
    </div>
  );
};

export default memo(RegisterForm);
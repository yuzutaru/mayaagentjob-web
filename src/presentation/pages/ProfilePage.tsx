import React, { useState } from 'react';
import { User, Moon, Sun, Globe, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from '../../core/i18n/TranslationContext';
import { useNavigate } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t, locale, setLocale } = useTranslation();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    setLoggingOut(false);
    navigate('/');
  };

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'id' : 'en');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-career-cardDark rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mb-4">
          <User className="w-10 h-10 text-white" />
        </div>
        {isLoggedIn && user ? (
          <>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('profile.guest')}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t('profile.notSignedIn')}</p>
          </>
        )}
      </div>

      <div className="bg-white dark:bg-career-cardDark rounded-2xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
        <div className="px-4 py-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('profile.settings')}</h3>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            {theme === 'dark' ? <Moon className="w-5 h-5 text-slate-600 dark:text-slate-300" /> : <Sun className="w-5 h-5 text-slate-600 dark:text-slate-300" />}
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{t('profile.darkMode')}</span>
          </div>
          <span className="text-sm text-slate-400">{theme === 'dark' ? t('profile.on') : t('profile.off')}</span>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{t('profile.language')}</span>
          </div>
          <button onClick={toggleLanguage} className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            {locale === 'en' ? 'English' : 'Bahasa'}
          </button>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="w-5 h-5 flex items-center justify-center text-xs font-bold text-slate-500">i</span>
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{t('profile.version')}</span>
          </div>
          <span className="text-sm text-slate-400">1.0.0</span>
        </div>
      </div>

      {isLoggedIn && (
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-red-200 dark:border-red-900/40 bg-white dark:bg-career-cardDark text-red-600 dark:text-red-400 font-semibold text-sm hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors disabled:opacity-50"
        >
          <LogOut className="w-4 h-4" />
          {loggingOut ? t('profile.loggingOut') : t('profile.logout')}
        </button>
      )}
    </div>
  );
};

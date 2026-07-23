import React from 'react';
import { Heart, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../../core/i18n/TranslationContext';
import logoIcon from '@/assets/logo-icon.jpg';

export const BottomTabBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const tabs = [
    { key: 'home', path: '/home', icon: () => <img src={logoIcon} alt="" className="w-5 h-5 rounded-full object-cover" />, label: t('tabs.home') },
    { key: 'saved', path: '/saved', icon: Heart, label: t('tabs.saved') },
    { key: 'profile', path: '/profile', icon: User, label: t('tabs.profile') },
  ];

  const activeTab = tabs.find((t) => location.pathname.startsWith(t.path))?.key || 'home';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-career-dark border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-lg mx-auto flex items-center justify-around px-4 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-colors ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

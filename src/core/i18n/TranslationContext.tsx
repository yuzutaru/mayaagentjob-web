import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from './translations/en';
import { id } from './translations/id';

type Locale = 'en' | 'id';

const translations = { en, id };

interface TranslationContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem('maya_locale');
    if (saved === 'en' || saved === 'id') return saved;
    return 'en';
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('maya_locale', newLocale);
  };

  const t = (key: string, variables?: Record<string, string | number>): string => {
    const dict = translations[locale] || translations.en;
    const parts = key.split('.');
    let current: any = dict;

    for (const part of parts) {
      if (current == null) {
        // Fallback to English dictionary if key is missing in active locale
        let engCurrent: any = translations.en;
        for (const engPart of parts) {
          if (engCurrent == null) return key;
          engCurrent = engCurrent[engPart];
        }
        current = engCurrent;
        break;
      }
      current = current[part];
    }

    if (typeof current !== 'string') {
      return key;
    }

    let result = current;
    if (variables) {
      Object.entries(variables).forEach(([name, val]) => {
        result = result.replace(new RegExp(`{${name}}`, 'g'), String(val));
      });
    }

    return result;
  };

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

import React, { useLayoutEffect } from 'react';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { isLocale, parsePathname, useTranslation } from './TranslationContext';

export const RootRedirect: React.FC = () => {
  const { locale } = useTranslation();
  return <Navigate to={`/${locale}`} replace />;
};

export const LocaleLayout: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const { locale, setLocale } = useTranslation();
  const location = useLocation();
  const isValid = lang === 'en' || lang === 'id';

  useLayoutEffect(() => {
    if (isValid && lang !== locale) setLocale(lang);
  }, [lang, isValid, locale, setLocale]);

  if (!isValid) {
    return (
      <Navigate
        to={`/${locale}${location.pathname}${location.search}${location.hash}`}
        replace
      />
    );
  }

  return <Outlet />;
};

export const LangFallback: React.FC = () => {
  const { locale } = useTranslation();
  const location = useLocation();
  const { locale: head, rest } = parsePathname(location.pathname);
  const active = head ?? locale;
  const tail = rest.split('/').filter(Boolean);

  if (tail.length > 0 && isLocale(tail[0])) {
    return (
      <Navigate to={`/${tail.join('/')}${location.search}${location.hash}`} replace />
    );
  }

  return <Navigate to={`/${active}${location.search}${location.hash}`} replace />;
};

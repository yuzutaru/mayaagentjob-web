import { describe, it, expect } from 'vitest';
import { localizePath, parsePathname } from './TranslationContext';

describe('localizePath', () => {
  it('prefixes internal absolute paths with the locale', () => {
    expect(localizePath('id', '/jobs')).toBe('/id/jobs');
    expect(localizePath('en', '/portfolio')).toBe('/en/portfolio');
    expect(localizePath('en', '/')).toBe('/en/');
  });

  it('prefixes relative paths with the locale', () => {
    expect(localizePath('id', 'jobs')).toBe('/id/jobs');
  });

  it('leaves anchors, external and empty paths untouched', () => {
    expect(localizePath('id', '#vacancy/1')).toBe('#vacancy/1');
    expect(localizePath('en', 'https://example.com/jobs')).toBe('https://example.com/jobs');
    expect(localizePath('en', 'tel:123')).toBe('tel:123');
    expect(localizePath('en', 'mailto:a@b.co')).toBe('mailto:a@b.co');
    expect(localizePath('en', '')).toBe('');
  });
});

describe('parsePathname', () => {
  it('parses a localized path into locale and remainder', () => {
    expect(parsePathname('/id')).toEqual({ locale: 'id', rest: '' });
    expect(parsePathname('/id/jobs')).toEqual({ locale: 'id', rest: '/jobs' });
    expect(parsePathname('/en/cv-export')).toEqual({ locale: 'en', rest: '/cv-export' });
  });

  it('reports locale null when the first segment is not a supported locale', () => {
    expect(parsePathname('/')).toEqual({ locale: null, rest: '' });
    expect(parsePathname('/jobs')).toEqual({ locale: null, rest: '/jobs' });
    expect(parsePathname('/fr/jobs')).toEqual({ locale: null, rest: '/fr/jobs' });
  });

  it('exposes double-locale paths via the remainder for fallback handling', () => {
    expect(parsePathname('/en/id')).toEqual({ locale: 'en', rest: '/id' });
    expect(parsePathname('/en/id/jobs')).toEqual({ locale: 'en', rest: '/id/jobs' });
    expect(parsePathname('/id/foo')).toEqual({ locale: 'id', rest: '/foo' });
  });
});

import { TypographyVariantsOptions } from '@mui/material/styles';

export const typographyTokens: TypographyVariantsOptions = {
  fontFamily: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
  h1: {
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: 1.25,
    letterSpacing: '-0.02em',
    color: '#0F172A',
  },
  h2: {
    fontSize: '1.5rem',
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
    color: '#0F172A',
  },
  h3: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.35,
    letterSpacing: '-0.01em',
    color: '#0F172A',
  },
  h4: {
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: 1.4,
    color: '#0F172A',
  },
  h5: {
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.45,
    color: '#0F172A',
  },
  h6: {
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: 1.5,
    color: '#0F172A',
  },
  subtitle1: {
    fontSize: '0.9375rem',
    fontWeight: 500,
    lineHeight: 1.5,
    color: '#64748B',
  },
  subtitle2: {
    fontSize: '0.8125rem',
    fontWeight: 500,
    lineHeight: 1.5,
    color: '#64748B',
  },
  body1: {
    fontSize: '0.875rem',
    lineHeight: 1.55,
    color: '#334155',
  },
  body2: {
    fontSize: '0.8125rem',
    lineHeight: 1.5,
    color: '#64748B',
  },
  button: {
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '0.875rem',
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.4,
    color: '#94A3B8',
  },
  overline: {
    fontSize: '0.6875rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#64748B',
  },
};

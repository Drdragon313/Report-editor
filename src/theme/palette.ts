import { PaletteOptions } from '@mui/material/styles';

export const scoreTiers = {
  needsWork: {
    main: '#E53935',
    light: '#FFEBEE',
    dark: '#B71C1C',
    contrastText: '#FFFFFF',
    label: 'Needs Work',
    range: [0, 560] as [number, number],
  },
  fair: {
    main: '#FB8C00',
    light: '#FFF3E0',
    dark: '#E65100',
    contrastText: '#FFFFFF',
    label: 'Fair',
    range: [561, 720] as [number, number],
  },
  good: {
    main: '#00897B',
    light: '#E0F2F1',
    dark: '#004D40',
    contrastText: '#FFFFFF',
    label: 'Good',
    range: [721, 880] as [number, number],
  },
  excellent: {
    main: '#2E7D32',
    light: '#E8F5E9',
    dark: '#1B5E20',
    contrastText: '#FFFFFF',
    label: 'Excellent',
    range: [881, 1000] as [number, number],
  },
};

export const paletteTokens: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#1E293B',
    light: '#334155',
    dark: '#0F172A',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#E53935',
    light: '#FFEBEE',
    dark: '#C62828',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#F8FAFC',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#0F172A',
    secondary: '#64748B',
    disabled: '#94A3B8',
  },
  divider: '#E2E8F0',
  error: {
    main: '#EF4444',
    light: '#FEE2E2',
    dark: '#B91C1C',
  },
  warning: {
    main: '#F59E0B',
    light: '#FEF3C7',
    dark: '#B45309',
  },
  info: {
    main: '#3B82F6',
    light: '#DBEAFE',
    dark: '#1D4ED8',
  },
  success: {
    main: '#10B981',
    light: '#D1FAE5',
    dark: '#047857',
  },
};

import { Components, Theme } from '@mui/material/styles';

export const componentOverrides: Components<Theme> = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: '#F8FAFC',
        color: '#0F172A',
        fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
      },
      '*::-webkit-scrollbar': {
        width: '6px',
        height: '6px',
      },
      '*::-webkit-scrollbar-track': {
        background: '#F1F5F9',
      },
      '*::-webkit-scrollbar-thumb': {
        background: '#CBD5E1',
        borderRadius: '3px',
      },
      '*::-webkit-scrollbar-thumb:hover': {
        background: '#94A3B8',
      },
    },
  },
  MuiCard: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        borderRadius: 12,
        border: '1px solid #E2E8F0',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.2s ease-in-out',
      },
    },
  },
  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
      rounded: {
        borderRadius: 12,
      },
      elevation1: {
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
      },
      elevation2: {
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
      },
      elevation3: {
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: 8,
        padding: '6px 16px',
        fontWeight: 600,
        textTransform: 'none',
        transition: 'all 0.15s ease-in-out',
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        fontWeight: 600,
        borderRadius: 6,
        height: 24,
        fontSize: '0.75rem',
      },
    },
  },
  MuiAccordion: {
    defaultProps: {
      elevation: 0,
      disableGutters: true,
    },
    styleOverrides: {
      root: {
        border: '1px solid #E2E8F0',
        borderRadius: '8px !important',
        marginBottom: 8,
        '&:before': {
          display: 'none',
        },
        '&.Mui-expanded': {
          margin: '0 0 8px 0',
        },
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      size: 'small',
    },
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 8,
        },
      },
    },
  },
};

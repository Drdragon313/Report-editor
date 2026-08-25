import { createTheme } from '@mui/material/styles';
import { paletteTokens, scoreTiers } from './palette';
import { typographyTokens } from './typography';
import { componentOverrides } from './components';

export const createAppTheme = () => {
  return createTheme({
    palette: paletteTokens,
    typography: typographyTokens,
    shape: {
      borderRadius: 10,
    },
    components: componentOverrides,
  });
};

export const theme = createAppTheme();
export { scoreTiers };
export default theme;

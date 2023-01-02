import { createTheme } from '@mui/material/styles';

const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#ffffff',
    },
    text: { navFooter: '#FFFFFF' },
    box: { main: '#FAFAFA' },
  },
};

const theme = createTheme(themeOptions);

export default theme;

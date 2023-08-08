import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#9851d6',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: { main: '#9851d6' },
    mode: 'dark',
  },
});

import { createTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: '#f44336',
    },
  },
});

export default theme;

import { purple, grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: purple[500],
        },
        background: {
            default: grey[900],
            paper: grey[800],
        },
        text: {
            primary: grey[50],
        },
    },
    components: {
        MuiListItem: {
            defaultProps: {
                color: 'primary',
            },
            styleOverrides: {
                root: {
                    color: grey[50],
                    '&:hover': {
                        color: purple[300],
                    },
                },
            },
        },
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: purple[500],
        },
        background: {
            default: grey[50],
            paper: grey[100],
        },
        text: {
            primary: grey[900],
        },
    },
    components: {
        MuiListItem: {
            defaultProps: {
                color: 'primary',
            },
            styleOverrides: {
                root: {
                    color: grey[900],
                    '&:hover': {
                        color: purple[500],
                    },
                },
            },
        },
    },
});

export { darkTheme, lightTheme };
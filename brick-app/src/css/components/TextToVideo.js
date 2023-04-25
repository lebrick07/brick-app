import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        height: 'calc(100% - 150px)',
        marginTop: theme.spacing(2),
        overflow: 'hidden',
    },
    input: {
        flexGrow: 1,
        marginBottom: theme.spacing(1),
    },
    errorMessage: {
        color: 'red',
    },
    videoPlayerWrapper: {
        marginTop: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '10px',
        padding: theme.spacing(2),
        maxHeight: '300px',
        overflowY: 'scroll',
    },
}));

export { useStyles };
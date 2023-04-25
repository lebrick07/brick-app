import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        height: 'calc(100% - 150px)',
        borderRadius: '10px',
        marginTop: theme.spacing(2),
    },
    input: {
        marginBottom: theme.spacing(1),
    },
    errorMessage: {
        color: 'red',
    },
    generatedImage: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '10px',
        marginTop: theme.spacing(1),
    },
}));

export { useStyles };
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
    responseBox: {
        backgroundColor: theme.palette.background.paper,
        margin: `${theme.spacing(1)}px 0`,
        borderRadius: '10px',
        overflowX: 'scroll',
        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        fontSize: '0.9rem',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
        },
    },
    responseBoxCode: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2),
        borderRadius: '10px',
        marginTop: theme.spacing(1),
        overflowX: 'scroll',
        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        fontSize: '0.9rem',
        [theme.breakpoints.down('sm')]: {
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
        },
        textAlign: 'left',
        margin: '0 auto',
        width: '80%',
    },
    chatHistory: {
        marginTop: theme.spacing(1),
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '10px',
        padding: theme.spacing(2),
        maxHeight: '300px',
        overflowY: 'scroll',
        margin: '0 auto',
        width: '80%',
    },
    chatHistoryEntry: {
        marginBottom: theme.spacing(1),
    },
    codeBlock: {
        backgroundColor: theme.palette.mode === 'dark' ? '#292929' : '#f0f0f0',
        color: theme.palette.mode === 'dark' ? '#f0f0f0' : '#000000',
        padding: '8px',
        borderRadius: '4px',
        fontFamily: 'monospace',
    },
    errorMessage: {
        color: 'red',
    },
    toggleHistoryButton: {
        marginTop: theme.spacing(1),
        margin: '0 auto',
        width: '50%',
    },
    clearConversationButton: {
        marginTop: theme.spacing(1),
    },
    conversationButton: {
        backgroundColor: 'white',
        color: 'black',
        border: '1px solid black',
        padding: '8px',
        borderRadius: '4px',
        cursor: 'pointer',
        margin: '4px',
        '&.focused': {
            backgroundColor: 'blue',
            color: 'white',
        },
    },
    code: {
        backgroundColor: (theme) =>
            theme.palette && theme.palette.mode === "dark"
                ? "rgb(49, 49, 49)"
                : "rgb(248, 248, 248)",
        color: (theme) =>
            theme.palette && theme.palette.mode === "dark"
                ? "rgb(189, 147, 249)"
                : "rgb(32, 32, 32)",
        padding: "0.2rem 0.5rem",
        borderRadius: "5px",
        fontSize: "1rem",
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
        wordWrap: "break-word",
        boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)",
        textAlign: 'left',
    },
    themedButton: {
        backgroundColor: 'rgba(106, 27, 154, 0.12)',
        color: theme.palette.mode === 'dark' ? 'white' : 'rgba(106, 27, 154, 0.87)',
        border: `1px solid rgba(106, 27, 154, 0.42)`,
        padding: '8px',
        borderRadius: '4px',
        cursor: 'pointer',
        margin: '4px',
        '&.focused': {
            backgroundColor: 'rgba(106, 27, 154, 0.5)',
            color: 'white',
        },
    },
}));

export { useStyles };

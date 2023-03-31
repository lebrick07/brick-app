import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const apiEndpoint = process.env.REACT_APP_OPENAI_AUDIO_API_URL;

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    // backgroundColor: theme.palette.background.paper,
    borderRadius: '10px',
    marginTop: theme.spacing(2),
  },
  errorMessage: {
    color: 'red',
  },
}));

function AudioTranscript() {
    const [audio, setAudio] = useState(null);
    const [transcript, setTranscript] = useState("");
    const [error, setError] = useState("");

    const handleFileChange = (event) => {
        setAudio(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!audio) {
            setError("Please upload an audio file.");
            return;
        }

        const formData = new FormData();
        formData.append('file', audio);
        formData.append('model', 'whisper-1');
        try {
            const response = await axios.post(apiEndpoint, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${apiKey}`
                },
            });

            setTranscript(response.data.text);
            setError("");
        } catch (err) {
            setError(err.message);
            setTranscript("");
        }
    };

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit}>
                <label>
                    Upload audio file:
                    <input type="file" accept="audio/*" onChange={handleFileChange} />
                </label>
                <Button type="submit" variant="contained">Submit</Button>
            </form>
            {transcript && (
              <div className={classes.transcript}>
                  <h2>Transcript:</h2>
                  <p>{transcript}</p>
              </div>
            )}
            {error && (
              <div className={classes.errorMessage}>
                  <h2>Error:</h2>
                  <p>{error}</p>
              </div>
            )}
        </div>
    );
}

export default AudioTranscript;

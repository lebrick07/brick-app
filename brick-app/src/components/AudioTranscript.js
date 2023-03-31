import React, { useState } from "react";
import axios from "axios";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const apiEndpoint = process.env.REACT_APP_OPENAI_AUDIO_API_URL;

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


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Upload audio file:
                    <input type="file" accept="audio/*" onChange={handleFileChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
            <div className="Transcript">
                <h2>Transcript:</h2>
                <p>{transcript}</p>
                <h2>Error:</h2>
                <p>{error}</p>
            </div>
        </div>
    );
}

export default AudioTranscript;
import React, { useState, useEffect } from 'react';
import recordService from "../services/records";

// Initialize SpeechRecognition, if it's available in the browser
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

export default function Dictation({ user }) {
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState('');

    // Set up an interval to send the transcript to the server every 5 seconds
    useEffect(() => {
        if (listening) {
            const logAndClearInterval = setInterval(async () => {
                await recordService.create({ record: transcript }, user);
                setTranscript('');
            }, 5000);
            return () => {
                clearInterval(logAndClearInterval);
            };
        }
    }, [listening, transcript, user]);

    // If SpeechRecognition is not available, show an error message
    if (!recognition) {
        return <p>your browser does not support speech recognition</p>
    }

    // Update the state with the new transcript
    recognition.onresult = (event) => {
        const newTranscript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        setTranscript(newTranscript);
    };

    // keep transcription going until user stops manually
    recognition.onend = () => {
        if (listening) {
            recognition.start();
        }
    };

    // Toggle the listening state and start/stop the speech recognition accordingly
    const toggleListening = () => {
        setListening(!listening);
        if (listening) {
            recognition.stop();
        } else {
            recognition.start();
        }
    }

    return (
        <div>
            <button type="button" onClick={toggleListening}>{listening ? 'stop' : 'start'}</button>
            <p>live transcript: {transcript}</p>
        </div >
    );
}

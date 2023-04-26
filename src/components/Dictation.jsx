import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useCreateRecord from '../hooks/useCreateRecords';
import '../App.css';

// Initialize SpeechRecognition, if it's available in the browser
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
if (recognition) {
    recognition.continuous = true;
}

export default function Dictation() {
    const [listening, setListening] = useState(false);
    const user = useSelector(state => state.user);
    const createRecordMutation = useCreateRecord();

    // If SpeechRecognition is not available, show an error message
    if (!recognition) {
        return <p>
            your browser does not support speech recognition.
            (Firefox, Opera,
            <a href='https://caniuse.com/speech-recognition'>
                click here for more info
            </a>)
        </p>
    }

    // Send the transcript to the server when the user stops speaking
    // Can send a lot of requests, maybe optomize
    recognition.onresult = (event) => {
        const newTranscript = event.results[event.results.length - 1][0].transcript;
        if (newTranscript !== '') {
            createRecordMutation.mutate({ newRecord: { record: newTranscript }, user });
        }
    };

    // when transcription stops, restart the speech SpeechRecognition
    recognition.onend = () => {
        if (listening) {
            recognition.start();
        }
    }

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
        <div className="dictation-container">
            <button className={listening ? "stop-button" : "start-button"} type="button" onClick={toggleListening}>
                {listening ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                    </svg>
                }
            </button>
        </div>
    );
}

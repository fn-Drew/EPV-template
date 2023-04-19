import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FilterRecords from './FilterRecords';
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
    const [transcript, setTranscript] = useState('');
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
        setTranscript(newTranscript);
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
        <div className="dictation-container">
            <button className={listening ? "stop-button" : "start-button"} type="button" onClick={toggleListening}>
                {listening ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="stop-svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <path strokeLinecap="round" fill="red" stroke="red" strokeLinejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="start-svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <path strokeLinecap="round" fill="lime" stroke="lime" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                    </svg>
                }
            </button>
            {transcript ? <p>Transcript: {transcript}</p> : <p>&larr; Start transcribing now!</p>}
            <FilterRecords />
        </div>
    );
}

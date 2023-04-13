import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useCreateRecord from '../hooks/useCreateRecords';

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
        <div>
            <button type="button" onClick={toggleListening}>{listening ? 'stop' : 'start'}</button>
            <p>live transcript: {transcript}</p>
        </div >
    );
}

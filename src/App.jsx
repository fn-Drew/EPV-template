import React, { useEffect, useState } from "react";
import AuthForm from "./components/AuthForm";
import LogoutButton from "./components/LogoutButton";
import RecordsDisplay from "./components/RecordsDisplay";
import useAuth from "./hooks/useAuth";
import "./App.css";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
    recognition.interimResults = true;
}

function Dictation() {
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState('');

    useEffect(() => {
        if (listening) {
            const logAndClearInterval = setInterval(() => {
                console.log(transcript);
                setTranscript('');
            }, 5000);
            return () => {
                clearInterval(logAndClearInterval);
            };
        }
    }, [listening, transcript]);

    if (!recognition) {
        return <p>your browser does not support speech recognition</p>
    }

    recognition.onresult = (event) => {
        const newTranscript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        setTranscript(newTranscript);
    };

    recognition.onend = () => {
        if (listening) {
            recognition.start();
        }
    };

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

function App() {
    const [records, setRecords] = useState("");
    const [toggleForm, setToggleForm] = useState({ accountForm: false, loginForm: false });

    const {
        user,
        credentials,
        setCredentials,
        handleAccountCreation,
        handleLogin,
        handleLogout,
    } = useAuth({ setToggleForm, setRecords });

    return (
        <div className="app">
            <AuthForm
                handleLogin={handleLogin}
                toggleForm={toggleForm}
                setToggleForm={setToggleForm}
                credentials={credentials}
                setCredentials={setCredentials}
                handleAccountCreation={handleAccountCreation}
            />
            <Dictation />
            <RecordsDisplay records={records} user={user} />
            <LogoutButton handleLogout={handleLogout} user={user} />
        </div>
    );
}

export default App;

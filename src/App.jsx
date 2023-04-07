import React, { useEffect, useState } from "react";
import AuthForm from "./components/AuthForm";
import LogoutButton from "./components/LogoutButton";
import RecordsDisplay from "./components/RecordsDisplay";
import useAuth from "./hooks/useAuth";
import recordService from "./services/records";
import "./App.css";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

function Dictation({ user }) {
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState('');

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
            <Dictation user={user} />
            <RecordsDisplay records={records} user={user} />
            <LogoutButton handleLogout={handleLogout} user={user} />
        </div>
    );
}

export default App;

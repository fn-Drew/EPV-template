import React, { useState } from "react";
import AuthForm from "./components/AuthForm";
import LogoutButton from "./components/LogoutButton";
import RecordsDisplay from "./components/RecordsDisplay";
import useAuth from "./hooks/useAuth";
import Dictation from "./components/Dictation";
import "./App.css";

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

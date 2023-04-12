import React, { useState } from "react";
import AuthForm from "./components/AuthForm";
import LogoutButton from "./components/LogoutButton";
import RecordsDisplay from "./components/RecordsDisplay";
import useAuth from "./hooks/useAuth";
import Dictation from "./components/Dictation";
import DisplayWhenLoggedIn from "./components/DisplayWhenLoggedIn";
import "./App.css";

function App() {
    const [toggleForm, setToggleForm] = useState({ accountForm: false, loginForm: false });

    // refactor useAuth to redux actions?
    const {
        handleAccountCreation,
        handleLogin,
        handleLogout,
    } = useAuth({ setToggleForm });

    return (
        <div className="app">
            <AuthForm
                handleLogin={handleLogin}
                toggleForm={toggleForm}
                setToggleForm={setToggleForm}
                handleAccountCreation={handleAccountCreation}
            />
            <DisplayWhenLoggedIn>
                <Dictation />
                <RecordsDisplay />
                <LogoutButton handleLogout={handleLogout} />
            </DisplayWhenLoggedIn>
        </div>
    );
}

export default App;

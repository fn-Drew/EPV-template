import React, { useState } from "react";
import RecordsDisplay from "./components/RecordsDisplay";
import useAuth from "./hooks/useAuth";
import Dictation from "./components/Dictation";
import DisplayWhenLoggedIn from "./components/DisplayWhenLoggedIn";
import Notification from "./components/Notification";
import AuthForm from "./components/AuthForm";
import Header from "./components/Header";
import "./App.css";

function App() {
    const [toggleForm, setToggleForm] = useState({ accountForm: false, loginForm: false });

    // refactor useAuth to redux actions?
    const {
        handleAccountCreation,
        handleLogin,
        handleLogout,
    } = useAuth(setToggleForm);

    return (
        <div className="app">
            <DisplayWhenLoggedIn displayWhenNotLoggedIn>
                <Notification />
                <AuthForm
                    handleLogin={handleLogin}
                    toggleForm={toggleForm}
                    setToggleForm={setToggleForm}
                    handleAccountCreation={handleAccountCreation}
                />
            </DisplayWhenLoggedIn>
            <DisplayWhenLoggedIn>
                <Header handleLogout={handleLogout} />
                <Dictation />
                <RecordsDisplay handleLogout={handleLogout} />
            </DisplayWhenLoggedIn>
        </div>
    );
}

export default App;

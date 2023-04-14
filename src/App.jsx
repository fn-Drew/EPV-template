import React, { useState } from "react";
import LogoutButton from "./components/LogoutButton";
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
            <Notification />
            <DisplayWhenLoggedIn displayWhenNotLoggedIn>
                <AuthForm
                    handleLogin={handleLogin}
                    toggleForm={toggleForm}
                    setToggleForm={setToggleForm}
                    handleAccountCreation={handleAccountCreation}
                />
            </DisplayWhenLoggedIn>
            <DisplayWhenLoggedIn>
                <Header />
                <Dictation />
                <RecordsDisplay handleLogout={handleLogout} />
                <LogoutButton handleLogout={handleLogout} />
            </DisplayWhenLoggedIn>
        </div>
    );
}

export default App;

import React, { useState } from "react";
import RecordsDisplay from "./components/RecordsDisplay";
import useAuth from "./hooks/useAuth";
import Dictation from "./components/Dictation";
import DisplayWhenLoggedIn from "./components/DisplayWhenLoggedIn";
import Notification from "./components/Notification";
import AuthForm from "./components/AuthForm";
import Header from "./components/Header";
import "./App.css";
import FilterRecords from "./components/FilterRecords";

function App() {
    const [toggleForm, setToggleForm] = useState(true);

    // refactor useAuth to redux actions?
    const {
        handleAccountCreation,
        handleLogin,
        handleLogout,
    } = useAuth();

    return (
        <div className="app">
            <DisplayWhenLoggedIn displayWhenNotLoggedIn>
                <AuthForm
                    handleLogin={handleLogin}
                    toggleForm={toggleForm}
                    setToggleForm={setToggleForm}
                    handleAccountCreation={handleAccountCreation}
                />
            </DisplayWhenLoggedIn>
            <DisplayWhenLoggedIn>
                <Header handleLogout={handleLogout} />
                <section>
                    <Dictation />
                    <FilterRecords />
                </section>
                <RecordsDisplay handleLogout={handleLogout} />
            </DisplayWhenLoggedIn>
        </div>
    );
}

export default App;

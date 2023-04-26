import React, { useState } from "react";
import RecordsDisplay from "./components/RecordsDisplay";
import useAuth from "./hooks/useAuth";
import Dictation from "./components/Dictation";
import DisplayWhenLoggedIn from "./components/DisplayWhenLoggedIn";
import AuthForm from "./components/AuthForm";
import Header from "./components/Header";
import FilterRecords from "./components/FilterRecords";
import FilterRecordInfo from './components/FilterRecordInfo';
import "./App.css";

function App() {
    const [toggleForm, setToggleForm] = useState(true);

    // refactor useAuth to redux actions?
    const {
        handleAccountCreation,
        handleLogin,
        handleLogout,
    } = useAuth();

    return (
        <div className="app-container">
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
                    <div className="app">
                        <section>
                            <Dictation />
                            <FilterRecordInfo />
                        </section>
                        <FilterRecords />
                        <RecordsDisplay handleLogout={handleLogout} />
                    </div>
            </DisplayWhenLoggedIn>
        </div>
    );
}

export default App;

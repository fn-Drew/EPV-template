import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import AuthForm from "./components/AuthForm";
import LogoutButton from "./components/LogoutButton";
import RecordsDisplay from "./components/RecordsDisplay";
import useAuth from "./hooks/useAuth";
import Dictation from "./components/Dictation";
import DisplayWhenLoggedIn from "./components/DisplayWhenLoggedIn";
import recordService from "./services/records";
import "./App.css";

function App() {
    const [toggleForm, setToggleForm] = useState({ accountForm: false, loginForm: false });
    const user = useSelector(state => state.user);
    // get records with react-query
    const { isLoading, error, isError } = useQuery(['records'], () => recordService.getAllUserRecords(user))

    const {
        handleAccountCreation,
        handleLogin,
        handleLogout,
    } = useAuth({ setToggleForm });

    if (user) {
        if (isLoading) {
            return <p>Loading...</p>;
        }
        // logout user if token expired
        // TODO: jank way to do this, need to refactor
        if (isError) {
            if (error.response.data.error) {
                handleLogout();
            }
        }
    }

    return (
        <div className="app">
            <AuthForm
                handleLogin={handleLogin}
                toggleForm={toggleForm}
                setToggleForm={setToggleForm}
                handleAccountCreation={handleAccountCreation}
            />
            <DisplayWhenLoggedIn user={user}>
                <Dictation user={user} />
                <RecordsDisplay />
                <LogoutButton handleLogout={handleLogout} />
            </DisplayWhenLoggedIn>
        </div>
    );
}

export default App;

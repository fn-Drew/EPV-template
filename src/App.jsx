import React, { useState } from "react";
import AuthForm from "./components/AuthForm";
import LogoutButton from "./components/LogoutButton";
import RecordsDisplay from "./components/RecordsDisplay";
import useAuth from "./hooks/useAuth";
import useUserRecords from "./hooks/useUserRecords";
import Dictation from "./components/Dictation";
import DisplayWhenLoggedIn from "./components/DisplayWhenLoggedIn";
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

    const { error, isError } = useUserRecords(user?.id, user?.token);

    // logout user if token expired
    if (isError) {
        if (error.response.data.error) {
            handleLogout();
            console.log('token expired, login again');
        }
    }

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
            <DisplayWhenLoggedIn user={user}>
                <Dictation user={user} />
                <RecordsDisplay records={records} user={user} />
                <LogoutButton handleLogout={handleLogout} />
            </DisplayWhenLoggedIn>
        </div>
    );
}

export default App;

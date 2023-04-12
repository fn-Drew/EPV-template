import React, { useState } from "react";
import { useSelector } from "react-redux";
import AuthForm from "./components/AuthForm";
import LogoutButton from "./components/LogoutButton";
import RecordsDisplay from "./components/RecordsDisplay";
import useAuth from "./hooks/useAuth";
import useUserRecords from "./hooks/useUserRecords";
import Dictation from "./components/Dictation";
import DisplayWhenLoggedIn from "./components/DisplayWhenLoggedIn";
import "./App.css";

function App() {
    const [toggleForm, setToggleForm] = useState({ accountForm: false, loginForm: false });
    const records = useSelector(state => state.records);
    const user = useSelector(state => state.user);

    const { error, isError } = useUserRecords(user?.id, user?.token);

    const {
        handleAccountCreation,
        handleLogin,
        handleLogout,
    } = useAuth({ setToggleForm });


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

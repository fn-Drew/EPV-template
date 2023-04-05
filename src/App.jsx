/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from "react";
import loginService from "./services/login";
import recordService from "./services/records";
import userService from "./services/users";
import LoginForm from "./components/LoginForm";
import AccountForm from "./components/AccountForm";
import "./App.css";

function LogoutButton({ handleLogout }) {
    return (
        <button className="button" type="button" onClick={handleLogout}>
            logout
        </button>
    );
}

function App() {
    const [user, setUser] = useState("");
    const [username, setUsername] = useState("");
    const [records, setRecords] = useState("");
    const [password, setPassword] = useState("");

    const [showAccountForm, setShowAccountForm] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);

    async function getRecords(id) {
        try {
            const userRecords = await recordService.getAllUserRecords(id);
            setRecords(userRecords);
        } catch (err) {
            console.error(err.code);
        }
    }

    // on page load check if user has logged in before
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("recUserCreds");
        if (loggedUserJSON) {
            const currentUser = JSON.parse(loggedUserJSON);
            setUser(currentUser);
            setShowAccountForm(false);
            setShowLoginForm(false);
            getRecords(currentUser.id);
            recordService.setToken(currentUser.token);
        } else {
            setShowAccountForm(false);
            setShowLoginForm(true);
        }
    }, []);

    function Records() {
        return records.map((record) => (
            <div className="record" key={record.id}>
                <div id="transcript">{record.record}</div>
                <div id="date">{record.date}</div>
            </div>
        ));
    }

    const handleAccountCreation = useCallback(
        async (event) => {
            event.preventDefault();
            try {
                await userService.create({
                    username,
                    password,
                });
            } catch (err) {
                console.error(err);
            }
        },
        [username, password]
    );

    const handleLogin = useCallback(
        async (event) => {
            event.preventDefault();
            try {
                const loggedUser = await loginService.login({
                    username,
                    password,
                });
                window.localStorage.setItem(
                    "recUserCreds",
                    JSON.stringify(loggedUser)
                );
                // recordService.setToken(user.token);
                getRecords(loggedUser.id);
                setUser(loggedUser);
                setUsername("");
                setPassword("");
                setShowAccountForm(false);
                setShowLoginForm(false);
            } catch (err) {
                console.error(err.response.data.error);
            }
        },
        [username, password]
    );

    const handleLogout = useCallback(() => {
        window.localStorage.removeItem("recUserCreds");
        setUser(null);
        setRecords(null);
        setShowLoginForm(true);
        setShowAccountForm(false);
    }, []);

    return (
        <div className="app">
            {showLoginForm ? (
                <LoginForm
                    handleLogin={handleLogin}
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    setShowLoginForm={setShowLoginForm}
                    setShowAccountForm={setShowAccountForm}
                />
            ) : null}
            {showAccountForm ? (
                <AccountForm
                    handleAccountCreation={handleAccountCreation}
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    setShowLoginForm={setShowLoginForm}
                    setShowAccountForm={setShowAccountForm}
                />
            ) : null}

            {records ? (
                <div className="records-container">
                    <Records />
                </div>
            ) : null}

            {user ? <LogoutButton handleLogout={handleLogout} /> : null}
        </div>
    );
}

export default App;

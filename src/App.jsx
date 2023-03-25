/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from "react";
import loginService from "./services/login";
import recordService from "./services/records";
import "./App.css";

function LogoutButton({ handleLogout }) {
    return (
        <button type="button" onClick={handleLogout}>
            logout
        </button>
    );
}

function LoginForm({
    handleLogin,
    username,
    password,
    setUsername,
    setPassword,
    setShowLoginForm,
    setShowAccountForm,
}) {
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
                <button
                    type="button"
                    onClick={() => {
                        setShowLoginForm(false);
                        setShowAccountForm(true);
                    }}
                >
                    Dont have an account?
                </button>
            </form>
        </>
    );
}

function CreateAccountForm({
    handleAccountCreation,
    username,
    password,
    setUsername,
    setPassword,
    setShowLoginForm,
    setShowAccountForm,
}) {
    return (
        <>
            <h1>Create Account</h1>
            <form onSubmit={handleAccountCreation}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">Create Account</button>
                <button
                    type="button"
                    onClick={() => {
                        setShowLoginForm(true);
                        setShowAccountForm(false);
                    }}
                >
                    Already have an account?
                </button>
            </form>
        </>
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
            <div key={record.id}>
                <div>{record.record}</div>
                <div>{record.date}</div>
            </div>
        ));
    }

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
        <>
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
                <CreateAccountForm
                    handleLogin={handleLogin}
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    setShowLoginForm={setShowLoginForm}
                    setShowAccountForm={setShowAccountForm}
                />
            ) : null}
            {records ? <Records /> : null}
            {user ? <LogoutButton handleLogout={handleLogout} /> : null}
        </>
    );
}

export default App;

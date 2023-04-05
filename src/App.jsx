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
    const [user, setUser] = useState(null);
    const [records, setRecords] = useState(null);
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [toggleForm, setToggleForm] = useState({ accountForm: false, loginForm: true });

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
            setToggleForm({ accountForm: false, loginForm: false });
            getRecords(currentUser.id);
            recordService.setToken(currentUser.token);
        } else {
            setToggleForm({ accountForm: false, loginForm: true });
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
                    ...credentials
                });
            } catch (err) {
                console.error(err);
            }
        },
        [credentials]
    );

    const handleLogin = useCallback(
        async (event) => {
            event.preventDefault();
            try {
                const loggedUser = await loginService.login({
                    ...credentials
                });
                window.localStorage.setItem(
                    "recUserCreds",
                    JSON.stringify(loggedUser)
                );
                // recordService.setToken(user.token);
                getRecords(loggedUser.id);
                setUser(loggedUser);
                setCredentials({ username: "", password: "" });
                setToggleForm({ accountForm: false, loginForm: false });
            } catch (err) {
                console.error(err.response.data.error);
            }
        },
        [credentials]
    );

    const handleLogout = useCallback(() => {
        window.localStorage.removeItem("recUserCreds");
        setUser(null);
        setRecords(null);
        setToggleForm({ accountForm: false, loginForm: true });
    }, []);

    return (
        <div className="app">
            {toggleForm.loginForm ? (
                <LoginForm
                    handleLogin={handleLogin}
                    credentials={credentials}
                    setCredentials={setCredentials}
                    setToggleForm={setToggleForm}
                />
            ) : null}
            {toggleForm.accountForm ? (
                <AccountForm
                    handleAccountCreation={handleAccountCreation}
                    credentials={credentials}
                    setCredentials={setCredentials}
                    setToggleForm={setToggleForm}
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

import React, { useCallback, useEffect, useState } from "react";
import loginService from "./services/login";
import recordService from "./services/records";
import userService from "./services/users";
import AuthForm from "./components/AuthForm";
import LogoutButton from "./components/LogoutButton";
import RecordsDisplay from "./components/RecordsDisplay";
import "./App.css";

function App() {
    const [user, setUser] = useState(null);
    const [records, setRecords] = useState("");
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [toggleForm, setToggleForm] = useState({ accountForm: false, loginForm: false });

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

            <AuthForm handleLogin={handleLogin} toggleForm={toggleForm} setToggleForm={setToggleForm} credentials={credentials} setCredentials={setCredentials} handleAccountCreation={handleAccountCreation} />

            {records ? (
                <div className="records-container">
                    <RecordsDisplay records={records} />
                </div>
            ) : null}

            {user ? <LogoutButton handleLogout={handleLogout} /> : null}
        </div>
    );
}

export default App;

import React, { useEffect, useState } from "react";
import loginService from "./services/login";
import recordService from "./services/records";
import "./App.css";

const handleLogout = () => {
    window.localStorage.removeItem("loggedRecUserCreds");
};

function App() {
    const [user, setUser] = useState("");
    const [username, setUsername] = useState("");
    const [records, setRecords] = useState("");
    const [password, setPassword] = useState("");

    const getRecords = async (id) => {
        const userRecords = await recordService.getAllUserRecords(id);
        setRecords(userRecords);
    };

    const Records = () => records.map((record) => <div key={record.id}>{record.record}</div>);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const loggedUser = await loginService.login({ username, password });
            window.localStorage.setItem(
                "loggedRecUserCreds",
                JSON.stringify(user)
            );
            // recordService.setToken(user.token);
            setUser(loggedUser);
            setUsername("");
            setPassword("");
            getRecords(loggedUser.id);
        } catch (err) {
            console.log(err.response.data.error);
        }
    };

    return (
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
            {records ? <Records /> : null}
            <button type="submit">login</button>
        </form>
    );
}

export default App;

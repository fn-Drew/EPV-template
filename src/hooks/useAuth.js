import { useState, useEffect } from 'react';
import loginService from '../services/login';
import userService from '../services/users';
import recordService from '../services/records';

export default function useAuth({ setToggleForm, setRecords }) {
    const [user, setUser] = useState(null);
    const [credentials, setCredentials] = useState({ username: '', password: '' });

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
            recordService.setToken(currentUser.token);
            setUser(currentUser);
            setToggleForm({ accountForm: false, loginForm: false });
            getRecords(currentUser.id);
        } else {
            setToggleForm({ accountForm: false, loginForm: true });
        }
    }, []);

    const handleAccountCreation = async (event) => {
        event.preventDefault();
        try {
            await userService.create(credentials);
        } catch (err) {
            console.error(err);
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const loggedUser = await loginService.login({
                ...credentials
            });
            window.localStorage.setItem(
                "recUserCreds",
                JSON.stringify(loggedUser)
            );
            recordService.setToken(loggedUser.token);
            setUser(loggedUser);
            setCredentials({ username: "", password: "" });
            setToggleForm({ accountForm: false, loginForm: false });
            getRecords(loggedUser.id);
        } catch (err) {
            console.error(err.response);
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem("recUserCreds");
        setUser(null);
        setRecords(null);
        setToggleForm({ accountForm: false, loginForm: true });
    };

    return {
        user,
        setUser,
        credentials,
        setCredentials,
        handleAccountCreation,
        handleLogin,
        handleLogout
    };
};

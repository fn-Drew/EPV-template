/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import loginService from '../services/login';
import recordService from '../services/records';
import useUserRecords from './useUserRecords';
import useCreateUser from './useCreateUser';

export default function useAuth({ setToggleForm, setRecords }) {
    const [user, setUser] = useState(null);
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const { data: userRecords, refetch: refetchRecords } = useUserRecords(user?.id, user?.token);
    const createUserMutation = useCreateUser();

    // Function to restore user session
    const restoreUserSession = () => {
        const loggedUserJSON = window.localStorage.getItem("recUserCreds");
        if (loggedUserJSON) {
            const currentUser = JSON.parse(loggedUserJSON);
            recordService.setToken(currentUser.token);
            setUser(currentUser);
            setToggleForm({ accountForm: false, loginForm: false });
        } else {
            setToggleForm({ accountForm: false, loginForm: true });
        }
    };

    // on page load check if user has logged in before
    useEffect(() => {
        restoreUserSession();
    }, []);

    // if user records change, update records state
    useEffect(() => {
        if (userRecords) {
            setRecords(userRecords);
        }
    }, [userRecords, setRecords]);

    const handleAccountCreation = async (event) => {
        event.preventDefault();
        createUserMutation.mutate(credentials);
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
            refetchRecords();
        } catch (err) {
            console.error(err.response);
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem("recUserCreds");
        setUser(null)
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

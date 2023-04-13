/* eslint-disable no-console */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loginService from '../services/login';
import recordService from '../services/records';
import useCreateUser from './useCreateUser';
import { setUser } from '../reducers/userReducer';
import { setCredentials } from '../reducers/credentialsReducer';
import { setNotification } from '../reducers/notificationReducer';

export default function useAuth(setToggleForm) {
    const credentials = useSelector(state => state.credentials)
    const createUserMutation = useCreateUser();
    const dispatch = useDispatch();

    // on page load check if user has logged in before
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("recUserCreds");
        if (loggedUserJSON) {
            const currentUser = JSON.parse(loggedUserJSON);
            recordService.setToken(currentUser.token);
            dispatch(setUser(currentUser));
            dispatch(setNotification(`Welcome back, ${currentUser.username}!`, 5));
            setToggleForm({ accountForm: false, loginForm: false });
        } else {
            setToggleForm({ accountForm: false, loginForm: true });
        }
    }, [dispatch, setToggleForm]);

    const handleAccountCreation = async (event) => {
        event.preventDefault();
        createUserMutation.mutate(credentials);
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const loggedUser = await loginService.login(credentials);
            window.localStorage.setItem(
                "recUserCreds",
                JSON.stringify(loggedUser)
            );
            recordService.setToken(loggedUser.token);
            dispatch(setUser(loggedUser));
            dispatch(setCredentials({ username: "", password: "" }));
            setToggleForm({ accountForm: false, loginForm: false });
        } catch (err) {
            console.error(err.response);
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem("recUserCreds");
        dispatch(setUser(null))
        setToggleForm({ accountForm: false, loginForm: true });
    };

    return {
        handleAccountCreation,
        handleLogin,
        handleLogout
    };
};

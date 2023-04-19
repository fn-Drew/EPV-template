/* eslint-disable no-console */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import recordService from '../services/records';
import useCreateUser from './useCreateUser';
import useLoginUser from './useLoginUser'
import { setUser } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';

export default function useAuth(setToggleForm) {
    // if need to get loading, error, etc. from rq
    // const { mutate: loginUserMutation, isLoading } = useLoginUser()
    const credentials = useSelector(state => state.credentials)
    const createUserMutation = useCreateUser();
    const loginUserMutation = useLoginUser()
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
        loginUserMutation.mutate(credentials);
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

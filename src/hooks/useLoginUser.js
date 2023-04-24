import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setCredentials } from "../reducers/credentialsReducer";
import { setNotification } from "../reducers/notificationReducer";
import { setUser } from "../reducers/userReducer";
import loginService from "../services/login";
import recordService from "../services/records"

const useLoginUser = () => {
    const dispatch = useDispatch();
    return useMutation((userCredentials) => loginService.login(userCredentials), {
        onSuccess: async (loggedUser) => {
            window.localStorage.setItem(
                "recUserCreds",
                JSON.stringify(loggedUser)
            );
            recordService.setToken(loggedUser.token);
            dispatch(setUser(loggedUser));
            dispatch(setCredentials({ username: "", password: "" }));
        },
        onError: (err) => {
            dispatch(setNotification(err.response.data.error, 5));
        }
    });
}

export default useLoginUser;

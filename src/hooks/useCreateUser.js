import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import userService from "../services/users";

const useCreateUser = () => {
    const dispatch = useDispatch();
    return useMutation((userCredentials) => userService.create(userCredentials), {
        onSuccess: (data) => {
            console.log("data", data);
            dispatch(setNotification(`Welcome, ${data.username}! Your account has been created.`, 5));
        },
        onError: (err) => {
            dispatch(setNotification(err.response.data.error, 5));
        }
    });
}

export default useCreateUser;

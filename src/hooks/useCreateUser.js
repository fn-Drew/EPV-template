import { useMutation } from "@tanstack/react-query";
import userService from "../services/users";

const useCreateRecord = () =>
    useMutation((data) => {
        console.log("create user data", data)
        userService.create(data)
    });

export default useCreateRecord;

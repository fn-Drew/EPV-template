import { useMutation } from "@tanstack/react-query";
import recordsService from "../services/records";

const useCreateRecord = () =>
    useMutation((data) => {
        console.log("newRecord", data.newRecord)
        console.log("user", data.user)
        recordsService.create(data.newRecord, data.user)
    });

export default useCreateRecord;

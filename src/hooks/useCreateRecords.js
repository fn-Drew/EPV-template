import { useMutation, useQueryClient } from "@tanstack/react-query";
import recordsService from "../services/records";

const useCreateRecord = () => {
    const queryClient = useQueryClient();
    return useMutation((data) => recordsService.create(data.newRecord, data.user), {
        onSuccess: () => {
            queryClient.invalidateQueries(['records'])
        }
    });
}

export default useCreateRecord;

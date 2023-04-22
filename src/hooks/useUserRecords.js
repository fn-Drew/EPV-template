import { useQuery } from "@tanstack/react-query";
import recordsService from "../services/records";

const useRecords = (user) =>
    useQuery(
        ["records"],
        () => recordsService.getAllUserRecords(user),
        {
            refetchOnWindowFocus: false,
            // do not refetch if the user is not logged in
            retry: (failureCount, error) => {
                if (error.response.status === 401) {
                    return false;
                }
                return 3;
            },
            enabled: !!user
        });

export default useRecords;

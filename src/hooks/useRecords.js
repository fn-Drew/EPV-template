import { useQuery } from "@tanstack/react-query";
import recordsService from "../services/records";

const useRecords = (user, token) =>
    useQuery(
        ["records", user],
        () => recordsService.getAllUserRecords(user), {
        retry: false,
        refetchOnWindowFocus: false,
        enabled: !!user && !!token
    });

export default useRecords;

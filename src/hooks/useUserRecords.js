import { useQuery } from "@tanstack/react-query";
import recordsService from "../services/records";

const useRecords = (user, token) =>
    useQuery(
        ["records"],
        () => recordsService.getAllUserRecords(user),
        {
            refetchOnWindowFocus: false,
            enabled: !!user && !!token
        });

export default useRecords;
